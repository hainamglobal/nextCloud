import re
from urllib.parse import urlsplit

import frappe
from frappe.model.document import Document


class MobileOrganization(Document):
    def validate(self):
        self.organization_name = (self.organization_name or "").strip()
        value = (self.domain or "").strip().lower().rstrip("/")
        if not self.organization_name:
            frappe.throw("Tên cơ quan không được để trống")
        if value.startswith("http://"):
            frappe.throw("Chỉ chấp nhận HTTPS cho domain cơ quan")
        if value.startswith("https://"):
            parsed = urlsplit(value)
            if parsed.path not in ("", "/") or parsed.query or parsed.fragment or parsed.port:
                frappe.throw("Domain không được chứa đường dẫn, port hoặc query")
            value = parsed.hostname or ""
        if not re.fullmatch(r"(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+", value):
            frappe.throw("Domain không hợp lệ, ví dụ: develop.nextgrp.vn")
        self.domain = value
