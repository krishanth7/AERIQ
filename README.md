<div align="center">

# AERIQ

### Intelligent RAS Farm Management

**A unified digital platform for managing, monitoring, analyzing, and optimizing modern Recirculating Aquaculture Systems.**

Developed by **Aero Intelli**

<br>

![Status](https://img.shields.io/badge/Status-Active%20Development-blue)
![Platform](https://img.shields.io/badge/Platform-SaaS-informational)
![Domain](https://img.shields.io/badge/Domain-Aquaculture-success)
![System](https://img.shields.io/badge/System-RAS-blue)
![License](https://img.shields.io/badge/License-AERIQ--PSL--1.0-lightgrey)
![Version](https://img.shields.io/badge/Version-Pre--Release-orange)

</div>

---

## AERIQ at a Glance

AERIQ is an intelligent farm-management and operational technology platform
designed specifically for **Recirculating Aquaculture Systems (RAS)**.

The platform is being developed to bring aquaculture production,
water-quality monitoring, fish growth, feeding, biofilter engineering,
equipment management, farm economics, IoT telemetry, analytics, alerts,
and intelligent decision support into one integrated environment.

AERIQ is designed around a simple principle:

> **Every important RAS operation should be measurable, traceable,
> understandable, and actionable.**

Instead of maintaining disconnected spreadsheets, paper records, sensor
dashboards, equipment logs, and calculation tools, AERIQ aims to provide
a structured digital operating environment for the complete production
cycle.

---

# Why AERIQ?

A modern RAS facility generates information continuously.

Farm teams need to understand:

- How much biomass is currently in each tank?
- How quickly are the fish growing?
- How much feed should be supplied?
- What is the current FCR?
- What is the expected TAN production?
- Is the biofilter operating within its design capacity?
- Is dissolved oxygen within the desired operating range?
- Is stocking density approaching its limit?
- How much water is circulating through the system?
- Are pumps and treatment systems operating correctly?
- When is the expected harvest?
- What is the estimated production cost?
- Which conditions require immediate attention?

These questions are interconnected.

AERIQ is being designed to connect them within a common data and
calculation architecture.

---

# Platform Vision

AERIQ is intended to evolve beyond traditional farm-management software.

The long-term platform combines:

**Aquaculture Management + RAS Engineering + IoT + Analytics + Automation + Intelligence**

into a unified operating environment.

```text
                         AERIQ
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
  Farm Operations     RAS Engineering    Intelligence
        │                  │                  │
   Production          Hydraulics          Analytics
   Fish Batches        Biofiltration       Forecasting
   Feeding             Oxygenation         Anomalies
   Mortality           Filtration          Optimization
   Harvest             Equipment           Decision Support
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    IoT & Telemetry
                           │
          Sensors · Devices · Controllers
```

---

# Core Platform Capabilities

## Farm Management

Create and manage structured aquaculture operations across multiple
facilities.

AERIQ is designed around the hierarchy:

```text
Organization
    │
    ├── Farm
    │    │
    │    ├── RAS System
    │    │      │
    │    │      ├── Tank
    │    │      ├── Tank
    │    │      ├── Treatment System
    │    │      └── Equipment
    │    │
    │    └── Production Cycles
    │
    └── Additional Farms
```

Potential capabilities include:

- Organization management
- Multi-farm management
- RAS system configuration
- Tank management
- Production-cycle management
- Species configuration
- User and team management
- Farm-level permissions

---

# Production Management

AERIQ provides a structured model for following fish from stocking to
harvest.

Production records may include:

- Species
- Stocking date
- Initial fish count
- Initial average weight
- Current fish count
- Average body weight
- Biomass
- Mortality
- Survival
- Stocking density
- Growth rate
- Sampling records
- Production stage
- Target harvest weight
- Expected harvest date
- Harvest quantity

The objective is to provide a continuously updated representation of the
production status of every active batch.

---

# Biomass & Growth

Biomass is one of the central variables in RAS management.

AERIQ can use production records to derive metrics such as:

```text
Biomass (kg)
=
Fish Count × Average Fish Weight (kg)
```

Example:

```text
Fish Count          = 7,000
Average Fish Weight = 1.00 kg

Biomass
= 7,000 × 1.00
= 7,000 kg
```

Biomass can then contribute to calculations involving:

- Feeding
- Stocking density
- Oxygen demand
- Waste production
- TAN loading
- Production forecasting
- Harvest planning

---

# Feed Management

Feed is both a biological input and a major production cost.

AERIQ is intended to support:

- Feed-rate management
- Daily feed calculations
- Feed schedules
- Feed inventory
- Feed batch tracking
- Feed costs
- Feed conversion ratio
- Historical feed consumption
- Stage-specific feeding strategies

Example:

```text
Daily Feed
=
Biomass × Feed Rate
```

For:

```text
Biomass   = 4,000 kg
Feed Rate = 1.3%
```

the calculated daily feed is:

```text
4,000 × 0.013
= 52 kg/day
```

---

# Feed Conversion Ratio

AERIQ can track production efficiency using FCR.

```text
FCR
=
Feed Consumed
───────────────
Biomass Gain
```

FCR history can be analyzed by:

- Production cycle
- Species
- Tank
- Growth stage
- Feed type
- Time period

---

# Water Quality Management

Water quality is fundamental to RAS operation.

AERIQ is designed to capture, analyze, and visualize parameters including:

| Parameter | Typical Unit |
|---|---|
| Temperature | °C |
| Dissolved Oxygen | mg/L |
| pH | pH |
| TAN | mg/L |
| NH₃ | mg/L |
| NO₂-N | mg/L |
| NO₃-N | mg/L |
| Alkalinity | mg/L as CaCO₃ |
| Carbon Dioxide | mg/L |
| Salinity | ppt / PSU |
| ORP | mV |

Depending on system configuration, additional parameters may be supported.

Measurements can originate from:

- Manual testing
- Laboratory testing
- Portable meters
- IoT sensors
- Automated monitoring equipment

---

# RAS Engineering Engine

One of AERIQ's core technical objectives is to connect production
management with RAS engineering.

Rather than treating engineering calculations as isolated tools, AERIQ
aims to connect them to actual farm and production data.

A simplified calculation chain may look like:

```text
Fish Count
    ↓
Average Fish Weight
    ↓
Biomass
    ↓
Feed Requirement
    ↓
Waste / TAN Load
    ↓
Biofilter Requirement
    ↓
Oxygen Demand
    ↓
Water Flow
    ↓
Treatment Requirements
    ↓
Operational Monitoring
```

---

# TAN & Nitrogen Management

AERIQ is intended to support nitrogen-management calculations associated
with feed loading and fish production.

Depending on the configured calculation methodology, the system may
evaluate:

- TAN generation
- Ammonia fraction
- Nitrite
- Nitrate
- Nitrogen loading
- Biofilter loading
- Water-exchange effects

Engineering assumptions and units should remain explicit and traceable.

---

# Biofilter Engineering

Biofiltration is one of the most important processes in a RAS.

AERIQ's biofilter module is intended to support calculations involving:

- TAN load
- Required nitrification capacity
- Media type
- Specific surface area
- Protected surface area
- Effective surface area
- Media volume
- Reactor volume
- Media fill percentage
- Hydraulic flow
- Hydraulic retention time
- Oxygen requirement
- Aeration
- Alkalinity demand
- Startup and maturation monitoring

The platform should preserve the assumptions behind engineering results
rather than presenting unexplained final numbers.

---

# Hydraulic Management

AERIQ is intended to model important hydraulic parameters such as:

- Total system volume
- Tank volume
- Treatment volume
- Recirculation flow
- Tank flow
- Turnover rate
- Hydraulic retention time
- Water exchange
- Makeup water
- Treatment bypasses

For example:

```text
Turnover Rate
=
System Flow (m³/h)
──────────────────
System Volume (m³)
```

These calculations can be connected to equipment configuration and
operational monitoring.

---

# Equipment Management

AERIQ is designed to maintain digital records for major RAS equipment.

Potential equipment classes include:

| Equipment | Management Scope |
|---|---|
| Drum Filter | Flow, status, runtime, maintenance |
| Biofilter | Flow, media, loading, performance |
| UV System | Flow, lamps, runtime, service |
| Protein Skimmer | Flow and operating status |
| Degasser | Flow and performance |
| Radial Flow Filter | Flow and maintenance |
| Sieve Filter | Flow and screen configuration |
| Oxygen Cone | Flow and oxygenation |
| Ozone Generator | Capacity and operating status |
| Pumps | Flow, head, power, runtime |
| Air Blowers | Airflow, pressure, runtime |
| Sensors | Calibration, telemetry, health |
| Controllers | Device status and communication |

Equipment records may include:

- Manufacturer
- Model
- Serial number
- Installation date
- Rated capacity
- Operating range
- Runtime
- Maintenance schedule
- Service history
- Fault history

---

# IoT & Telemetry

AERIQ is designed to progressively integrate real-time aquaculture
telemetry.

```text
Sensor / Controller
        │
        ▼
    Edge Device
        │
        ▼
      MQTT
        │
        ▼
 Telemetry Service
        │
        ▼
     AERIQ API
        │
        ▼
 Time-Series Data
        │
        ▼
 Dashboard / Alerts / Analytics
```

Potential telemetry sources include:

- DO sensors
- pH sensors
- Temperature sensors
- ORP sensors
- Water-level sensors
- Flow meters
- Pressure sensors
- Energy meters
- Equipment controllers

---

# Alerts & Operational Intelligence

AERIQ aims to convert raw measurements into actionable information.

Examples may include:

```text
LOW DISSOLVED OXYGEN
Tank: T-04
DO: 3.7 mg/L
Severity: Critical
```

```text
HIGH TAN
RAS System: RAS-02
TAN: 1.8 mg/L
Severity: Warning
```

```text
PUMP FAULT
Equipment: Circulation Pump P-02
Status: Offline
Severity: Critical
```

Alert logic should account for configuration, species, production stage,
and operating conditions where appropriate.

---

# Analytics

AERIQ is intended to provide operational and production analytics across
the complete farming cycle.

Potential KPIs include:

- Current biomass
- Average body weight
- Survival rate
- Mortality rate
- FCR
- Daily feed
- Growth rate
- Stocking density
- Water-quality trends
- TAN load
- Equipment runtime
- Production cost
- Cost per kilogram
- Harvest forecast
- System performance

---

# AERIQ Intelligence

Future AERIQ intelligence capabilities are intended to assist farm teams
with understanding complex operational data.

Potential capabilities include:

- Water-quality anomaly detection
- Growth forecasting
- Biomass forecasting
- Feed optimization
- Harvest prediction
- Mortality pattern analysis
- Equipment anomaly detection
- Production-risk detection
- Farm-performance analysis
- Intelligent recommendations

AI-generated outputs should remain distinguishable from measured values
and deterministic engineering calculations.

AERIQ intelligence is intended as **decision support**, not as a
replacement for appropriate professional aquaculture, veterinary,
engineering, safety, or regulatory judgment.

---

# Farm Economics

AERIQ is intended to connect biological production with financial
performance.

Potential cost categories include:

- Fingerlings / seed
- Feed
- Electricity
- Oxygen
- Water
- Labor
- Chemicals
- Consumables
- Maintenance
- Equipment
- Transportation
- Other operating costs

Potential outputs include:

- Production cost
- Cost per kg
- Revenue
- Gross margin
- Cycle profitability
- Farm profitability
- Feed-cost contribution
- Energy-cost contribution

---

# Reports

AERIQ is intended to generate structured operational and management
reports.

Potential reports include:

- Daily Farm Report
- Water Quality Report
- Feeding Report
- Mortality Report
- Biomass Report
- Growth Report
- Production Cycle Report
- Equipment Report
- Maintenance Report
- Inventory Report
- Harvest Report
- Financial Performance Report

---

# Multi-Tenant SaaS Architecture

AERIQ is being designed as a multi-tenant SaaS platform.

```text
AERIQ
  │
  ├── Organization A
  │      ├── Farm 01
  │      └── Farm 02
  │
  ├── Organization B
  │      └── Farm 01
  │
  └── Organization C
         ├── Farm 01
         ├── Farm 02
         └── Farm 03
```

Tenant isolation is treated as a fundamental security requirement.

Data belonging to one organization must not be accessible to another
organization without explicit authorization.

---

# Roles & Access Control

AERIQ may support roles such as:

| Role | Typical Responsibility |
|---|---|
| Owner | Organization-level control |
| Administrator | Platform/farm administration |
| Farm Manager | Production and operational management |
| Technician | Equipment and maintenance operations |
| Operator | Daily farm activities |
| Viewer | Read-only access |

Authorization must be enforced server-side.

---

# Proposed Technology Architecture

AERIQ is designed around a modern, service-oriented web architecture.

### Frontend

- Next.js
- React
- TypeScript
- Modern responsive web UI

### Backend

- Python
- FastAPI
- REST APIs
- Background processing

### Data

- PostgreSQL
- Redis
- Time-series strategy where required

### IoT

- MQTT
- Edge gateways
- Device telemetry
- Sensor integrations

### Infrastructure

- Docker
- CI/CD
- Cloud-ready deployment
- Monitoring and observability

The final technology stack may evolve as engineering requirements mature.

---

# High-Level System Architecture

```text
                    ┌─────────────────────┐
                    │     AERIQ Web       │
                    │   Next.js / React   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      API Layer      │
                    │       FastAPI       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │ Farm Service │  │ RAS Engine   │  │ Alert Engine │
     └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
            │                  │                  │
            └──────────────────┼──────────────────┘
                               │
                               ▼
                     ┌─────────────────┐
                     │   PostgreSQL    │
                     └─────────────────┘

                               ▲
                               │
                     ┌─────────────────┐
                     │ MQTT / IoT Layer│
                     └────────┬────────┘
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
               Sensor       Gateway     Controller
```

---

# Data Integrity

AERIQ distinguishes between different classes of information.

```text
Measured Data
     │
     ├── Sensor readings
     └── Manual measurements

User-Entered Data
     │
     ├── Stocking
     ├── Feed
     └── Mortality

Calculated Data
     │
     ├── Biomass
     ├── FCR
     ├── TAN
     └── Density

Predicted Data
     │
     ├── Growth forecast
     ├── Harvest forecast
     └── AI recommendations
```

Maintaining this distinction is important for auditability and operational
decision-making.

---

# Security

Security is a core AERIQ engineering requirement.

The platform architecture is intended to incorporate:

- Authentication
- Role-based authorization
- Tenant isolation
- Secure API access
- Encryption in transit
- Appropriate encryption at rest
- Secret management
- Audit logging
- Input validation
- Dependency monitoring
- Secure IoT communication
- Security monitoring

Please review:

[`SECURITY.md`](SECURITY.md)

**Do not report security vulnerabilities through public GitHub Issues.**

---

# Accessibility

AERIQ aims to make complex aquaculture information understandable and
operable by as many users as reasonably possible.

Accessibility considerations include:

- Keyboard navigation
- Screen-reader compatibility
- Clear form labels
- Accessible alerts
- Readable contrast
- Responsive interfaces
- Alternatives to color-only status indicators
- Understandable charts and tables

See:

[`ACCESSIBILITY.md`](ACCESSIBILITY.md)

---

# Contributing

AERIQ follows structured engineering and contribution practices.

Before contributing, review:

[`CONTRIBUTING.md`](CONTRIBUTING.md)

Contributions affecting RAS calculations must document:

- Inputs
- Units
- Formula
- Assumptions
- Outputs
- Validation
- Tests
- Engineering basis

---

# Development Status

> **AERIQ is currently under active development.**

The architecture, APIs, database models, engineering calculations,
interfaces, and features may change before a stable production release.

The current repository should not be interpreted as a completed
production system.

---

# Product Roadmap

The high-level development direction is:

### Foundation

- Repository architecture
- Engineering standards
- Security
- Testing
- CI/CD
- Documentation

### Core SaaS

- Authentication
- Organizations
- Farms
- Users
- Roles
- RAS systems
- Tanks

### Production

- Fish batches
- Production cycles
- Biomass
- Growth
- Feed
- FCR
- Mortality
- Harvest

### Water Quality

- Manual readings
- Parameter configuration
- Historical trends
- Thresholds
- Alerts

### RAS Engineering

- TAN
- Biofilter
- Biomedia
- Flow
- Turnover
- HRT
- Oxygen
- Water exchange
- Equipment sizing

### Operations

- Equipment
- Maintenance
- Inventory
- Farm costs
- Reports

### Connected Farm

- IoT
- MQTT
- Sensors
- Telemetry
- Equipment monitoring

### Intelligence

- Anomaly detection
- Forecasting
- Optimization
- Decision support
- Intelligent farm insights

---

# Engineering Principles

AERIQ development follows several core principles.

### Engineering Before Guesswork

Important calculations should be based on explicit inputs, formulas,
units, assumptions, and validated engineering methods.

### Data Before AI

Reliable farm data and deterministic calculations should form the
foundation for intelligent features.

### Safety Before Automation

Physical equipment control requires appropriate authorization,
validation, monitoring, and fail-safe engineering.

### Explainability Before Black Boxes

Important operational recommendations should expose relevant reasoning,
inputs, or assumptions where practical.

### Security by Design

Tenant isolation, authorization, data protection, and secure device
communication are architectural requirements.

### Farm Usability

Technology must remain practical for people operating real aquaculture
facilities.

---

# Repository Governance

Important project documents include:

| Document | Purpose |
|---|---|
| `README.md` | Platform overview |
| `LICENSE` | Proprietary software license |
| `SECURITY.md` | Security and vulnerability reporting |
| `ACCESSIBILITY.md` | Accessibility commitments |
| `CONTRIBUTING.md` | Contribution standards |

Additional governance and technical documentation will be introduced as
the project develops.

---

# License

AERIQ is proprietary software.

Copyright © 2026 **Aero Intelli**.

All Rights Reserved.

AERIQ is governed by the:

**AERIQ Proprietary Software License v1.0 (`AERIQ-PSL-1.0`)**

See:

[`LICENSE`](LICENSE)

Unless expressly authorized in writing, the software may not be copied,
redistributed, sublicensed, sold, reverse engineered, or commercially
exploited outside the rights granted by the applicable license or
agreement.

Third-party and open-source components remain subject to their respective
licenses.

---

# Disclaimer

AERIQ may provide calculations, analytics, forecasts, alerts,
recommendations, and decision-support information related to aquaculture
operations.

Actual biological and engineering performance can vary based on species,
feed, water chemistry, environmental conditions, equipment performance,
management practices, disease, system design, and other factors.

AERIQ should therefore be used as a management and decision-support
platform.

Safety-critical, veterinary, engineering, financial, and regulatory
decisions should be independently reviewed by appropriately qualified
professionals where required.

---

<div align="center">

## AERIQ

### Intelligent RAS Farm Management

**Monitor. Manage. Analyze. Optimize.**

A product of **Aero Intelli**

<br>

**Aquaculture · RAS Engineering · IoT · Analytics · Intelligence**

<br>

Copyright © 2026 Aero Intelli. All Rights Reserved.

</div>
