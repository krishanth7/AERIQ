# AERIQ Accessibility

AERIQ is committed to making intelligent aquaculture management usable by
as many people as reasonably possible.

AERIQ is a Recirculating Aquaculture System (RAS) farm management platform
developed by Aero Intelli. It is designed for farm owners, managers,
operators, technicians, engineers, researchers, and other aquaculture
professionals.

Aquaculture software may be used in offices, laboratories, control rooms,
production facilities, and field environments. Users may interact with
AERIQ using different devices, input methods, screen sizes, languages,
and assistive technologies.

Accessibility is therefore considered part of product quality rather than
an optional interface feature.

This document describes the accessibility goals of AERIQ, expectations
for contributors, supported interaction methods, and the process for
reporting accessibility barriers.

---

## Accessibility Principles

AERIQ development should aim to make essential farm-management workflows:

- Perceivable
- Understandable
- Operable
- Predictable
- Keyboard accessible
- Screen-reader friendly
- Responsive across supported screen sizes
- Understandable without relying exclusively on color
- Usable with reasonable text scaling
- Clear during operational and emergency conditions

Where practical, AERIQ aims toward the principles and success criteria
associated with **WCAG 2.2 Level AA**.

This is an engineering target and should not be interpreted as a claim of
verified WCAG conformance unless a specific AERIQ release has undergone a
documented accessibility evaluation.

---

# Priorities

AERIQ prioritizes accessibility in workflows that are important to farm
operations and user safety.

## 1. Farm Dashboard

Users should be able to understand important farm conditions without
depending exclusively on visual styling.

Dashboard information may include:

- Current biomass
- Stocking density
- Feed consumption
- Mortality
- Production progress
- Water quality
- Equipment status
- System alerts
- Farm notifications

Important information should have meaningful text or semantic
representation wherever practical.

---

## 2. Water-Quality Monitoring

Water-quality information is operationally important.

Parameters may include:

- Dissolved Oxygen (DO)
- Temperature
- pH
- TAN
- NH3
- NO2-N
- NO3-N
- Alkalinity
- Salinity
- Carbon dioxide
- ORP
- Other supported measurements

AERIQ should avoid communicating safe, warning, and critical conditions
through color alone.

For example, instead of displaying only:

`Green`

`Yellow`

`Red`

AERIQ should provide understandable states such as:

`NORMAL`

`WARNING`

`CRITICAL`

where appropriate.

Icons, labels, values, and other indicators should supplement color.

---

## 3. Alerts and Critical Conditions

Critical farm alerts should be designed for rapid understanding.

Examples include:

- Low dissolved oxygen
- High ammonia
- High nitrite
- Abnormal pH
- Abnormal temperature
- Pump failure
- Sensor failure
- Water-flow interruption
- Aeration failure
- Oxygenation failure
- Equipment malfunction

Important alerts should clearly communicate:

1. What happened
2. Which farm/system/tank is affected
3. The measured value or condition
4. Severity
5. Time detected
6. Recommended next action when available

Critical information should not depend only on color, animation, sound,
or an icon.

---

## 4. Keyboard Accessibility

Important AERIQ workflows should be usable using a keyboard wherever
reasonably possible.

Interactive components should have logical focus behavior.

Examples include:

- Navigation
- Buttons
- Forms
- Dialogs
- Menus
- Tabs
- Tables
- Filters
- Search
- Settings
- Alerts

Users should be able to identify which interactive element currently has
keyboard focus.

---

## 5. Screen Readers

User-interface components should use meaningful semantic structure where
practical.

This includes appropriate:

- Headings
- Labels
- Buttons
- Form controls
- Tables
- Navigation landmarks
- Status messages
- Dialog descriptions
- Alternative text

Icon-only controls should have accessible names.

For example, an icon visually representing editing should expose an
accessible name such as:

`Edit monthly production target`

rather than only:

`button`

---

## 6. Forms

AERIQ contains data-entry workflows for farm operations.

Forms may include:

- Farm configuration
- Tank configuration
- Fish stocking
- Biomass sampling
- Feed records
- Mortality records
- Water-quality readings
- Equipment configuration
- Maintenance records
- Production cycles
- Inventory
- Financial information

Inputs should have understandable labels.

Where a unit is required, the unit should be clearly communicated.

Examples:

`Tank Volume — m³`

`Fish Weight — g`

`Dissolved Oxygen — mg/L`

`Flow Rate — m³/h`

Validation messages should explain what needs to be corrected instead of
relying only on color.

---

## 7. Tables

Operational information is frequently presented in tables.

Where practical, tables should provide:

- Meaningful column headings
- Logical reading order
- Accessible sorting controls
- Clear units
- Understandable empty states
- Keyboard-accessible controls

Large tables should remain understandable when horizontally scrolled or
viewed on smaller screens.

---

## 8. Charts and Analytics

Charts should not be the only way important information is communicated.

Where practical, important charts should provide equivalent information
through one or more of:

- Data tables
- Numerical summaries
- Text descriptions
- Accessible labels
- Downloadable reports

Users should not need to distinguish between colors alone to interpret
important data series.

---

## 9. Responsive Design

AERIQ may be used on:

- Desktop computers
- Laptops
- Tablets
- Mobile devices
- Farm control-room displays

Interfaces should adapt appropriately to supported screen sizes.

Critical information should remain readable without unnecessary
horizontal scrolling wherever reasonably practical.

---

## 10. Text and Readability

AERIQ should prioritize clear operational language.

Interface text should avoid unnecessary technical complexity.

Where aquaculture or engineering terminology is necessary, units,
descriptions, help text, or documentation should be provided where
appropriate.

Text should support reasonable browser zoom and text scaling without
breaking essential functionality.

---

## 11. Contrast

Text, controls, indicators, and essential interface components should
maintain sufficient visual distinction from their backgrounds.

This is particularly important for AERIQ because the application may be
used in bright farm environments or on mobile devices outdoors.

---

## 12. Motion and Animation

Animation should not be required to understand essential information.

Unnecessary motion should be minimized.

Where substantial animation or continuously moving content is introduced,
the application should consider user preferences such as reduced-motion
settings where technically appropriate.

---

# Contributor Expectations

Accessibility is part of AERIQ's engineering quality requirements.

Contributors making user-facing changes should consider accessibility
during implementation and review.

Contributions should avoid introducing:

- Unlabelled interactive controls
- Keyboard traps
- Important information communicated only through color
- Images containing essential information without alternatives
- Forms without meaningful labels
- Inaccessible custom controls
- Unnecessary automatic focus changes
- Unreadable contrast
- Interfaces that fail under reasonable text scaling

---

## Pull Requests

Pull requests containing significant UI changes should describe relevant
accessibility considerations when applicable.

A contributor may include:

- Keyboard testing performed
- Screen-reader testing performed
- Responsive-layout testing
- Browser testing
- Zoom/text-scaling testing
- Screenshots
- Accessibility-tool results

Screenshots and recordings are helpful but should not be required when
they are unnecessary for understanding the change.

---

## Automated Testing

AERIQ may progressively introduce automated accessibility checks into its
development and CI/CD workflow.

Automated tools can identify many common problems, but they do not prove
that an interface is accessible.

Manual testing remains important.

---

# Reporting Accessibility Issues

Accessibility barriers are welcome as GitHub issues.

When creating an accessibility report, use a title such as:

`[ACCESSIBILITY] Unable to operate tank selector using keyboard`

or:

`[ACCESSIBILITY] Water-quality warning cannot be distinguished without color`

Please provide information such as:

- Affected page or feature
- Task you were attempting to complete
- What happened
- What you expected
- Browser
- Operating system
- Device type
- Assistive technology, if relevant
- Steps to reproduce

Screenshots or recordings are optional.

**You are never required to disclose a disability or medical condition
when reporting an accessibility problem.**

---

# Severity

Accessibility issues may be triaged according to their impact.

## Critical

An accessibility barrier prevents access to an operationally critical
feature and no reasonable alternative exists.

Examples:

- A critical farm alert cannot be accessed using a supported interaction
  method.
- A user cannot acknowledge or understand a safety-relevant warning.

---

## High

A major workflow cannot reasonably be completed.

Examples:

- A keyboard user cannot submit water-quality readings.
- Essential navigation cannot be operated with a keyboard.
- A screen-reader user cannot identify critical tank information.

---

## Medium

A workflow remains usable but requires significant additional effort.

Examples:

- Poor focus order
- Missing form descriptions
- Difficult-to-understand validation
- Important chart information lacking an accessible alternative

---

## Low

The issue causes limited inconvenience but does not prevent completion of
the task.

Examples:

- Minor labeling improvements
- Non-critical alternative-text improvements
- Minor focus inconsistencies

Maintainers may adjust severity during triage.

---

# How We Respond

When an accessibility issue is reported, AERIQ maintainers should aim to:

1. Review the reported barrier.
2. Determine whether it can be reproduced.
3. Assess the affected workflow and severity.
4. Identify an appropriate fix or workaround.
5. Prioritize the issue according to impact.
6. Implement and review the change.
7. Request verification when appropriate.

Operationally critical accessibility barriers should receive higher
priority than cosmetic accessibility improvements.

Specific resolution times are not guaranteed unless defined by a
separate service or support agreement.

---

# Ownership and Maintenance

Accessibility is a shared responsibility across the AERIQ project.

**Product:** AERIQ  
**Organization:** Aero Intelli

Developers, designers, reviewers, and maintainers working on user-facing
functionality are expected to consider accessibility as part of normal
product development.

Accessibility requirements should be reviewed when major interface
components or workflows are introduced or redesigned.

---

# Supported Environments

AERIQ is intended to support modern web environments.

Development and testing should progressively cover major current versions
of commonly used browsers, including:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari where applicable

The application should support common interaction methods such as:

- Mouse
- Keyboard
- Touch
- Screen readers where tested

Support for a particular browser, operating system, assistive technology,
or device should not be considered formally verified until that
combination has been tested.

---

# Field and Farm Environments

AERIQ has additional usability considerations because it may be used in
aquaculture facilities.

Users may encounter:

- Bright sunlight
- Wet environments
- Gloves
- Tablets
- Mobile devices
- Large control-room displays
- Intermittent connectivity
- Time-sensitive operational conditions

Where appropriate, interfaces should therefore favor:

- Clear typography
- Large practical interaction targets
- High information clarity
- Simple navigation
- Clear operational status
- Explicit units
- Understandable alerts
- Minimal unnecessary interaction

Accessibility and operational usability should complement each other.

---

# Known Limitations

AERIQ is under active development.

Not every combination of browser, device, input method, screen reader,
or assistive technology has necessarily been formally evaluated.

Accessibility coverage should expand as the platform matures.

Known barriers should be documented through tracked issues rather than
assuming that the absence of reports means that no accessibility
barriers exist.

---

# Feedback and Improvements

Suggestions for improving AERIQ accessibility are welcome.

For accessibility improvements, documentation suggestions, or general
feedback, contributors may open an appropriate GitHub issue.

Active accessibility barriers should be reported using the accessibility
reporting process described above.

Security vulnerabilities should **not** be submitted as accessibility
issues. Please follow the AERIQ Security Policy for security-related
reports.

---

# Accessibility Commitment

AERIQ aims to make complex aquaculture information easier to understand
and operate.

As the platform evolves, accessibility should remain part of the design,
engineering, testing, documentation, and review process.

The objective is straightforward:

**Important aquaculture information should be understandable and
operable by as many users as reasonably possible.**

---

**AERIQ**  
Intelligent RAS Farm Management

Developed by **Aero Intelli**

Copyright © 2026 Aero Intelli. All Rights Reserved.
