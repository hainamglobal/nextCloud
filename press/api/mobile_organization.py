import frappe


@frappe.whitelist(allow_guest=True, methods=["GET"])
def list_organizations():
    organizations = frappe.get_all(
        "Mobile Organization",
        filters={"enabled": 1},
        fields=["organization_name", "domain"],
        order_by="organization_name asc",
        limit_page_length=0,
    )
    return [
        {"name": item.organization_name, "domain": item.domain}
        for item in organizations
    ]
