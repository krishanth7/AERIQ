# AERIQ Security Policy

## Security at AERIQ

Security is a core engineering requirement of AERIQ.

AERIQ is an intelligent Recirculating Aquaculture System (RAS) farm
management platform developed by Aero Intelli. The platform may process
aquaculture production data, water-quality measurements, equipment
telemetry, IoT sensor data, farm operational records, user information,
analytics, alerts, and automation commands.

Security vulnerabilities affecting these systems could potentially impact
data confidentiality, farm operations, production decisions, connected
equipment, or service availability.

For this reason, Aero Intelli takes responsible security research and
vulnerability reporting seriously.

---

## Supported Versions

Security updates are provided for versions of AERIQ that are actively
maintained by Aero Intelli.

| Version | Supported |
|---------|-----------|
| Latest production release | Yes |
| Current development release | Best effort |
| Older supported releases | Case-by-case |
| End-of-life releases | No |

Users should run the latest supported version whenever possible.

---

## Reporting a Security Vulnerability

Please **do not create a public GitHub Issue** for suspected security
vulnerabilities.

Public disclosure before a vulnerability has been investigated and
remediated may place AERIQ users and infrastructure at risk.

Use GitHub's **Private Vulnerability Reporting** feature when it is enabled
for this repository.

Repository maintainers may configure this under:

`Settings → Security → Private vulnerability reporting`

If an official security contact is published by Aero Intelli in the
future, that channel may also be used.

When submitting a vulnerability report, please provide enough information
for the engineering team to reproduce and investigate the issue.

Useful information includes:

- A clear description of the vulnerability
- Affected AERIQ component
- Affected version or commit
- Steps required to reproduce the issue
- Expected behavior
- Actual behavior
- Potential security impact
- Proof of concept, when appropriate
- Relevant logs or screenshots
- Suggested mitigation, if known
- Your preferred contact information

Please remove passwords, API keys, access tokens, private customer data,
and other sensitive information from reports whenever possible.

---

## Security Scope

Security reports may include vulnerabilities affecting:

### Authentication and Authorization

Examples include:

- Authentication bypass
- Authorization bypass
- Privilege escalation
- Broken access control
- Session-management vulnerabilities
- Account takeover vulnerabilities
- Multi-factor authentication bypass

### Multi-Tenant Isolation

AERIQ is designed to support multiple organizations and farms.

Reports involving unauthorized access across organizations, farms,
facilities, users, tanks, production cycles, or customer datasets are
considered particularly important.

Examples include:

- Cross-tenant data exposure
- Tenant-ID manipulation
- Insecure direct object references
- Unauthorized farm access
- Role-permission bypasses

### API Security

Examples include:

- Unauthorized API access
- Broken object-level authorization
- Improper rate limiting with meaningful security impact
- Injection vulnerabilities
- API authentication bypass
- Exposure of sensitive API responses

### Data Security

Examples include unauthorized exposure or modification of:

- User information
- Farm information
- Production records
- Biomass information
- Feeding records
- Mortality records
- Water-quality measurements
- Financial or inventory information
- Equipment telemetry
- Historical analytics

### IoT and Connected Equipment

AERIQ may integrate with sensors, controllers, gateways, pumps,
aeration equipment, oxygenation systems, water-treatment equipment,
and other RAS infrastructure.

High-priority reports include:

- Unauthorized device control
- Device impersonation
- Command injection
- Telemetry manipulation
- Sensor-data spoofing
- MQTT authentication or authorization failures
- Unauthorized configuration changes
- Insecure firmware or device-update mechanisms

### RAS Automation and Control

Vulnerabilities that could cause unauthorized or unsafe manipulation of
farm equipment should be reported immediately.

Examples may include unauthorized changes affecting:

- Water circulation
- Pumps
- Aeration
- Oxygenation
- Feeding systems
- Valves
- Filtration equipment
- Alarm systems
- Other connected RAS equipment

### Web Application Security

Examples include:

- SQL injection
- Command injection
- Server-side request forgery (SSRF)
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Path traversal
- Remote code execution
- Unsafe file uploads
- Authentication vulnerabilities
- Sensitive information disclosure

### Cloud and Infrastructure Security

Examples include:

- Publicly exposed storage
- Misconfigured infrastructure
- Credential exposure
- Container escape vulnerabilities
- Unauthorized administrative access
- Infrastructure privilege escalation

### Secrets and Credentials

Please immediately report exposure of:

- API keys
- Database credentials
- Cloud credentials
- Private keys
- Authentication secrets
- JWT signing secrets
- IoT credentials
- Production environment credentials

Do not attempt to use exposed credentials beyond what is minimally
necessary to demonstrate that the exposure exists.

---

## Vulnerability Severity

AERIQ evaluates vulnerabilities according to their technical impact,
exploitability, affected systems, customer impact, and operational risk.

### Critical

Examples:

- Remote code execution
- Production infrastructure compromise
- Authentication bypass affecting administrative accounts
- Cross-tenant compromise at scale
- Unauthorized control of critical RAS equipment
- Large-scale exposure of sensitive customer information

### High

Examples:

- Significant privilege escalation
- Unauthorized access to another customer's farm
- Serious API authorization failures
- Sensitive production-data exposure
- Unauthorized equipment-control capabilities

### Medium

Examples:

- Limited information disclosure
- Restricted privilege escalation
- Security-control bypass with significant prerequisites
- Stored XSS with meaningful authenticated impact

### Low

Examples:

- Minor information exposure
- Low-impact configuration weaknesses
- Security-hardening opportunities without a practical exploitation path

Final severity classification remains at the discretion of the AERIQ
security and engineering team.

---

## Responsible Security Research

We welcome good-faith security research intended to improve AERIQ.

Researchers should:

1. Test only what is necessary to demonstrate the vulnerability.
2. Avoid accessing another user's or organization's information.
3. Avoid modifying or deleting production data.
4. Avoid disrupting AERIQ services.
5. Avoid intentionally affecting live aquaculture operations.
6. Avoid controlling physical equipment without explicit authorization.
7. Avoid persistence after demonstrating a vulnerability.
8. Protect any sensitive information accidentally encountered.
9. Report vulnerabilities privately.
10. Allow reasonable time for investigation and remediation before
    public disclosure.

---

## Prohibited Testing

Unless Aero Intelli has provided explicit written authorization, please
do not perform:

- Denial-of-service or distributed denial-of-service attacks
- Destructive testing
- Physical attacks against facilities or equipment
- Social engineering
- Phishing
- Credential stuffing
- Brute-force attacks against production accounts
- Malware deployment
- Ransomware simulation against production infrastructure
- Large-scale automated scanning that materially affects service
  availability
- Access to another customer's production environment
- Modification of live aquaculture production data
- Unauthorized control of pumps, oxygenation, aeration, filtration,
  feeding, or other physical systems

Testing must never intentionally endanger fish, farm personnel, equipment,
customers, or production operations.

---

## Artificial Intelligence Security

AERIQ may include AI-assisted analytics, forecasting, recommendations,
automation, or decision-support capabilities.

Relevant security reports may include:

- Unauthorized access to AI systems
- Sensitive information leakage
- Tenant-data leakage through AI features
- Prompt injection resulting in unauthorized system actions
- Tool or function-call authorization bypass
- AI-generated access to restricted resources
- Manipulation of automated decision pipelines
- Unauthorized modification of models or system instructions

AI-generated output that is merely inaccurate, without a security impact,
may be treated as a product-quality issue rather than a security
vulnerability.

---

## Aquaculture Safety

AERIQ may provide calculations, alerts, predictions, recommendations, or
automation relating to aquaculture operations.

Security researchers must avoid testing techniques that could materially
alter live production conditions.

Particular care should be taken around systems involving:

- Dissolved oxygen
- Water circulation
- Aeration
- Feeding
- Temperature
- pH
- TAN / ammonia
- Nitrite
- Carbon dioxide
- Ozone
- Pumps
- Valves
- Biofilters
- Emergency alarms

A vulnerability capable of manipulating safety-critical measurements,
alerts, or equipment should be treated as potentially high or critical
severity.

---

## Security Architecture Principles

AERIQ development should follow security-by-design principles, including:

- Least-privilege access
- Strong authentication
- Role-based access control
- Tenant isolation
- Secure secret management
- Encryption in transit
- Appropriate encryption at rest
- Input validation
- Output encoding
- Secure API authorization
- Dependency management
- Audit logging
- Security monitoring
- Rate limiting
- Backup and recovery procedures
- Secure software-development practices

Sensitive credentials must never be committed directly to the repository.

---

## Dependencies

AERIQ may rely on open-source packages and third-party services.

Dependencies should be monitored for known vulnerabilities and updated
according to their security impact and compatibility requirements.

Automated dependency scanning may be used where appropriate.

---

## Secret Management

The following must never be committed to the repository:

- `.env` production files
- Passwords
- API secrets
- Database credentials
- Cloud-provider credentials
- Private certificates
- SSH private keys
- JWT signing secrets
- Production IoT credentials

Use environment variables or an approved secret-management system.

If a secret is accidentally committed, removing it from the latest commit
is not sufficient.

The credential should be considered compromised and should be revoked or
rotated as soon as reasonably possible.

---

## Security Logging

Security-relevant actions should be auditable where technically
appropriate.

Examples include:

- Authentication attempts
- Administrative actions
- Permission changes
- Organization membership changes
- Device registration
- Equipment-control commands
- API credential changes
- Security-setting changes
- Sensitive configuration changes

Logs should avoid unnecessarily storing passwords, authentication tokens,
private keys, or other secrets.

---

## Disclosure Process

After receiving a credible vulnerability report, Aero Intelli may:

1. Confirm receipt of the report.
2. Attempt to reproduce the vulnerability.
3. Evaluate severity and affected systems.
4. Develop and test remediation.
5. Deploy or publish an appropriate security update.
6. Coordinate disclosure when appropriate.
7. Publish a security advisory when warranted.

Complex vulnerabilities may require additional investigation and
remediation time.

---

## Security Advisories

Confirmed vulnerabilities may be documented using GitHub Security
Advisories or another appropriate disclosure mechanism.

Security advisories may include:

- Affected versions
- Severity
- Impact
- Patched versions
- Mitigation instructions
- Upgrade recommendations
- CVE information when applicable

---

## Bug Bounty

Submission of a vulnerability does **not** automatically create an
entitlement to financial compensation.

Unless Aero Intelli separately announces an official bug-bounty program,
no monetary reward is guaranteed.

---

## Legal and Licensing

Security research does not grant ownership of AERIQ software, source
code, intellectual property, algorithms, models, or proprietary
technology.

Use of AERIQ remains subject to the applicable:

**AERIQ Proprietary Software License (AERIQ-PSL-1.0)**

and any additional commercial, SaaS, privacy, or service agreements
applicable to the user.

---

## Security Contact

**Product:** AERIQ  
**Developer:** Aero Intelli  
**Security Channel:** GitHub Private Vulnerability Reporting, when enabled  
**Repository:** AERIQ

Do not disclose security vulnerabilities through public GitHub Issues,
Discussions, pull requests, or social-media channels.

---

## Final Statement

The security of AERIQ protects more than software.

AERIQ may participate in monitoring and managing real aquaculture
operations, production systems, connected equipment, and operational
decisions.

Security, reliability, tenant isolation, data integrity, and safe
automation are therefore treated as fundamental engineering requirements
of the AERIQ platform.

Copyright (c) 2026 Aero Intelli. All Rights Reserved.
