from datetime import UTC, datetime, timedelta
from enum import StrEnum
from types import SimpleNamespace

import pytest

from app.templates import render_template
from config import TemplateSettings


class Status(StrEnum):
    active = "active"
    on_hold = "on_hold"
    expired = "expired"
    limited = "limited"
    disabled = "disabled"


@pytest.mark.parametrize("template", ["subscription/classic.html", "subscription/index.html"])
@pytest.mark.parametrize("status", list(Status))
def test_classic_page_keeps_account_details_and_status_link_visibility(status, template):
    user = SimpleNamespace(
        username="rasa_preview",
        status=status,
        data_limit=10 * 1024**3,
        used_traffic=2 * 1024**3,
        data_limit_reset_strategy="no_reset",
        expire=datetime.now(UTC) + timedelta(days=7),
        on_hold_expire_duration=86400,
        on_hold_timeout=None,
    )
    html = render_template(
        template,
        {
            "user": user,
            "links": ["vless://preview@example.invalid:443"],
            "apps": [],
            "announce": None,
            "announce_url": None,
        },
    )
    assert 'name="viewport" content="width=device-width, initial-scale=1"' in html
    assert 'charset="UTF-8"' in html
    assert "rasa_preview" in html
    assert f">{status.value}</span" in html
    assert ('class="link-input"' in html) == (status in {Status.active, Status.on_hold})
    assert 'id="qrPopup"' in html
    assert "function toggleTheme()" in html
    assert 'alt="Hirkan"' in html
    assert "hirkan-brand" in html
    assert "PasarGuard" not in html


def test_classic_is_default_and_explicit_template_choice_is_supported(monkeypatch):
    monkeypatch.delenv("SUBSCRIPTION_PAGE_TEMPLATE", raising=False)
    assert TemplateSettings(_env_file=None).subscription_page_template == "subscription/classic.html"
    monkeypatch.setenv("SUBSCRIPTION_PAGE_TEMPLATE", "subscription/custom.html")
    assert TemplateSettings(_env_file=None).subscription_page_template == "subscription/custom.html"


@pytest.mark.parametrize("template", ["subscription/classic.html", "subscription/index.html"])
def test_subscription_page_escapes_account_and_link_values(template):
    user = SimpleNamespace(
        username='<script>alert("account")</script>',
        status=Status.active,
        data_limit=0,
        used_traffic=0,
        data_limit_reset_strategy="no_reset",
        expire=None,
    )
    link = 'vless://demo@example.invalid:443#name\" onfocus=\"alert(1)'
    html = render_template(template, {"user": user, "links": [link], "apps": [], "announce": '<img src=x onerror=alert(1)>', "announce_url": None})
    assert '<script>alert("account")</script>' not in html
    assert '<img src=x onerror=alert(1)>' not in html
    assert '&#34; onfocus=&#34;' in html
    assert "copyLink(this.parentElement.querySelector('.link-input').value, this)" in html
