# Contributing to AERIQ

Thank you for your interest in contributing to **AERIQ**.

AERIQ is an intelligent Recirculating Aquaculture System (RAS) farm
management platform developed by **Aero Intelli**.

The platform is intended to bring aquaculture production management,
RAS engineering, water-quality monitoring, equipment management,
analytics, IoT, automation, and intelligent decision support into a
single system.

Contributions must maintain a high standard of engineering quality,
security, reliability, maintainability, and aquaculture correctness.

---

# 1. Important Licensing Notice

AERIQ is proprietary software.

The repository is governed by the:

**AERIQ Proprietary Software License v1.0 (AERIQ-PSL-1.0)**

Submitting a contribution does not automatically grant permission to
copy, redistribute, sublicense, sell, or commercially exploit AERIQ or
its proprietary source code.

Contributors must ensure that they have the legal right to submit all
code, documentation, designs, data, tests, and other materials included
in their contribution.

Do not submit copyrighted, confidential, proprietary, or third-party
material unless its use is properly authorized and compatible with the
AERIQ project.

---

# 2. Contribution Philosophy

AERIQ values contributions that are:

- Technically correct
- Secure
- Maintainable
- Well documented
- Properly tested
- Accessible
- Performance-conscious
- Backward-compatible where practical
- Relevant to aquaculture operations
- Based on defensible engineering assumptions
- Safe for production environments

A large contribution is not automatically better than a small one.

Prefer focused changes that solve a clearly defined problem.

---

# 3. Areas of Contribution

Contributions may involve areas such as:

## Farm Management

- Organizations
- Farms
- Facilities
- RAS systems
- Tanks
- Production cycles
- Fish batches
- Stocking
- Sampling
- Harvest management

## Production Management

- Biomass
- Growth
- Survival
- Mortality
- Stocking density
- Production forecasting
- Harvest forecasting

## Feed Management

- Daily feeding
- Feed rate
- Feed inventory
- Feed conversion ratio (FCR)
- Feed-cost calculations
- Feeding schedules

## Water Quality

Including, where supported:

- Temperature
- Dissolved Oxygen (DO)
- pH
- TAN
- NH3
- NO2-N
- NO3-N
- Alkalinity
- Salinity
- Carbon dioxide
- ORP

## RAS Engineering

Potential modules include:

- System flow
- Turnover
- Hydraulic retention time
- Water exchange
- TAN production
- Biofilter calculations
- Biomedia sizing
- Oxygen demand
- Aeration
- Degassing
- Mechanical filtration
- UV treatment
- Ozone systems
- Pumps
- Oxygenation systems

## Equipment Management

Including:

- Drum filters
- Biofilters
- UV systems
- Protein skimmers
- Degassers
- Radial-flow separators
- Sieve filters
- Oxygen cones
- Ozone generators
- Pumps
- Blowers
- Sensors
- Controllers

## IoT

Potential contributions include:

- Sensor integrations
- MQTT
- Telemetry ingestion
- Device registration
- Equipment status
- Alarm processing
- Edge devices

## Analytics

- Farm KPIs
- Historical trends
- Production analytics
- Equipment analytics
- Water-quality trends
- Cost analysis
- Performance comparisons

## Artificial Intelligence

Potential future contributions may include:

- Anomaly detection
- Forecasting
- Decision support
- Feed optimization
- Water-quality analysis
- Production predictions
- Equipment diagnostics

## Platform Engineering

- Frontend
- Backend
- APIs
- Database
- Authentication
- Authorization
- Multi-tenancy
- Infrastructure
- Testing
- Observability
- Documentation
- Accessibility
- Security

---

# 4. Before You Start

Before implementing a significant change:

1. Search existing issues.
2. Search existing pull requests.
3. Check project documentation.
4. Determine whether similar functionality already exists.
5. Open an issue for substantial new functionality when appropriate.
6. Describe the problem before proposing a large implementation.

For major architectural changes, obtain maintainer agreement before
investing significant development effort.

---

# 5. Development Workflow

The preferred contribution workflow is:

```text
Issue
  ↓
Discussion / Requirements
  ↓
Branch
  ↓
Implementation
  ↓
Tests
  ↓
Documentation
  ↓
Pull Request
  ↓
Automated Checks
  ↓
Code Review
  ↓
Approval
  ↓
Merge
