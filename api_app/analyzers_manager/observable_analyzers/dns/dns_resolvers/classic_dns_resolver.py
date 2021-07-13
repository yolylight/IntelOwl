# This file is a part of IntelOwl https://github.com/intelowlproject/IntelOwl
# See the file 'LICENSE' for copying permission.

"""Default DNS resolutions"""

import ipaddress
import socket
import dns.resolver

from urllib.parse import urlparse
from api_app.analyzers_manager import classes
from api_app.analyzers_manager.observable_analyzers.dns.dns_responses import (
    dns_resolver_response,
)

import logging

logger = logging.getLogger(__name__)


class ClassicDNSResolver(classes.ObservableAnalyzer):
    """Resolve a DNS query with Default resolver"""

    def set_params(self, params):
        self._query_type = params.get("query_type", "A")

    def run(self):
        resolutions = []
        if self.observable_classification == self._serializer.ObservableTypes.IP.value:
            try:
                ipaddress.ip_address(self.observable_name)
                hostname, alias, ip = socket.gethostbyaddr(self.observable_name)
                if alias:
                    resolutions.extend(alias)
                if hostname:
                    resolutions.append(hostname)
            except (socket.gaierror, socket.herror):
                logger.warning(f"No resolution for ip {self.observable_name}")
                resolutions = []
        elif self.observable_classification in [
            self._serializer.ObservableTypes.DOMAIN.value,
            self._serializer.ObservableTypes.URL.value,
        ]:
            observable = self.observable_name
            # for URLs we are checking the relative domain
            if (
                self.observable_classification
                == self._serializer.ObservableTypes.URL.value
            ):
                observable = urlparse(self.observable_name).hostname

            try:
                dns_resolutions = dns.resolver.query(observable, self._query_type)
                for resolution in dns_resolutions:
                    element = {
                        "TTL": dns_resolutions.rrset.ttl,
                        "data": resolution.to_text(),
                        "name": dns_resolutions.qname.to_text(),
                        "type": dns_resolutions.rdtype,
                    }
                    resolutions.append(element)
            except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
                logger.warning(
                    f"No resolution for "
                    f"{self.observable_classification} {self.observable_name}"
                )
                resolutions = []

        return dns_resolver_response(self.observable_name, resolutions)
