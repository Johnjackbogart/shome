# Personal app styling and paid rollout

Status: implemented as an ungated product capability (2026-08). The initial
release lets a signed-in member choose primary, secondary, and accent app
backgrounds; primary and secondary accent colors; border, primary text, accent
text, and secondary text colors; border radius and line style; font family;
app spacing; and whether the complete app style overrides the style saved
on first-party posts.
The preference follows the account across web and mobile and does not change
the member's public profile page.

## Product rules

- App style is account-owned, not device-owned. Web and mobile read and write
  the same preference through `/api/app-style`.
- The API keeps the cohesive `appStyle` object used by clients, while the
  `user` table stores each property in its own typed column:
  `app_background_color`, `app_secondary_background_color`,
  `app_accent_background_color`, `app_accent_color`,
  `app_secondary_accent_color`, `app_border_style`, `app_border_radius`,
  `app_border_line_style`, `app_font`, `app_font_color`,
  `app_accent_font_color`, `app_secondary_text_color`, `app_spacing`, and
  `app_override_post_styles`.
- The default matches the current shome dark appearance, so migration does not
  opt existing accounts into a visibly different design.
- The primary background belongs to page-level canvas areas. The secondary
  background belongs to cards, raised settings sections, navigation surfaces,
  and app-styled posts.
- The accent background belongs to search fields in the feed and Discover
  experiences, plus editable fields on Sources and the create-post action, on
  both web and mobile.
- The accent font color belongs to the feed filter and refresh actions on web
  and mobile.
- The primary and secondary accents tint the two radial gradients over the
  signed-in web canvas. Their defaults preserve the original indigo and pink
  treatment.
- Spacing controls the gap below the signed-in navigation and the vertical gaps
  between feed sections (including the search controls, status rows, and post
  list) and between individual posts. It is allow-listed from no gap through
  32px.
- "Override post styles" affects first-party shome posts only. It replaces the
  post's complete saved look with the app secondary background, border, radius,
  line, font, and text settings. Imported feed items use the app surface,
  typography, and border tokens without being treated as authored posts.
- Draft changes preview immediately. They follow the user to another device
  only after saving.
- The migration copies every value from the earlier JSONB preference into the
  corresponding columns before removing `app_style`, preserving saved choices.
  Malformed database values fall back to the product default instead of being
  passed to a client as style data. The API accepts only six-digit hex colors,
  allow-listed font, border, and spacing values, and a boolean override
  preference.

## Paid feature plan

Treat custom app styling as a candidate subscription entitlement named
`custom_app_style`; do not tie authorization directly to a specific plan name
or payment provider. Pricing, trial length, and plan packaging remain product
decisions.

The capability is intentionally ungated during development. Before a paid
launch:

1. Add an account entitlement service with one server-side answer for
   `custom_app_style`. Subscription webhooks should update durable entitlement
   state; request handlers should not call a billing provider synchronously.
2. Enforce the entitlement on `PUT /api/app-style`. Hiding controls in the UI
   is not authorization. `GET` should return both the saved preference and its
   availability so web and mobile present the same locked/unlocked state.
3. Preserve a lapsed member's saved style, but stop applying it and show the
   default app style. Restoring the entitlement should restore their previous
   customization. Do not delete style data on cancellation.
4. Add a read-only preview for free members and put the upgrade explanation
   beside the save action. The message should say exactly what is included;
   avoid implying that public profile or per-post styling is paid unless those
   features are separately packaged.
5. Cover active, trialing, grace-period, lapsed, refunded, and webhook-delayed
   states in route tests. Confirm that a free client cannot save by calling the
   API directly.
6. Roll out behind a remotely controlled feature flag, first to staff and a
   small cohort. Track editor opens, successful saves, override adoption,
   upgrade starts, conversion, cancellation, and style-related support issues.
   Do not record the colors a member chooses as analytics properties.

## Launch acceptance criteria

- A saved style appears consistently after signing in on another web or mobile
  client.
- Free and lapsed accounts receive the product default even if older custom
  values remain stored.
- Complete post styling changes only when the override is enabled and returns
  immediately when it is disabled.
- App styling never leaks onto signed-out marketing pages or public profiles.
- Keyboard, screen-reader, and touch users can edit and save every control.
- Product QA includes light and dark color choices. Before paid launch, add
  contrast guidance or automatic foreground colors so a background choice
  cannot make core navigation unreadable.

## Possible follow-ups

Cache the last successfully loaded app style per account on each mobile device.
On startup, apply the validated cached style immediately, then refresh it from
the server in the background; clear or switch the cache when the signed-in
account changes. Until that cache exists, an unavailable app-style endpoint
falls back to `DEFAULT_APP_STYLE` so offline startup is never blocked.

Expand the schema only when the product needs it. Likely next tokens are spacing
density beyond feed gaps and optional uploaded font assets. Keep each value
allow-listed and version the API representation if a future theme format cannot
remain backward compatible.
