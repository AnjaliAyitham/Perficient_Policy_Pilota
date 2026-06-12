# Perficient Business Continuity and Disaster Recovery Policy

**Effective Date:** January 1, 2024  
**Last Updated:** April 5, 2024  
**Policy Owner:** VP of IT Operations & Chief Risk Officer  
**Applies To:** All Perficient business units, critical systems, and personnel

---

## 1. Purpose

This policy ensures Perficient can maintain essential business operations during and after disruptive events, including natural disasters, cyberattacks, pandemics, infrastructure failures, and other emergencies.

---

## 2. Business Impact Analysis

### 2.1 Critical Business Functions

| Priority | Function | Maximum Tolerable Downtime (MTD) | Recovery Time Objective (RTO) |
|----------|----------|----------------------------------|-------------------------------|
| P1 | Client production systems | 4 hours | 2 hours |
| P1 | Email and communications | 4 hours | 2 hours |
| P1 | Authentication systems (Okta, AD) | 2 hours | 1 hour |
| P2 | Source code repositories | 8 hours | 4 hours |
| P2 | Project management tools | 8 hours | 4 hours |
| P2 | VPN and remote access | 4 hours | 2 hours |
| P3 | HR and payroll systems | 48 hours | 24 hours |
| P3 | Financial systems | 48 hours | 24 hours |
| P4 | Training platforms | 1 week | 72 hours |
| P4 | Marketing systems | 1 week | 72 hours |

### 2.2 Recovery Point Objectives (RPO)
- P1 systems: RPO = 1 hour (continuous replication)
- P2 systems: RPO = 4 hours (frequent snapshots)
- P3 systems: RPO = 24 hours (daily backups)
- P4 systems: RPO = 48 hours (daily backups, delayed restore acceptable)

---

## 3. Disaster Recovery Strategy

### 3.1 Infrastructure
- **Primary:** Azure East US 2 region
- **Secondary (Hot standby):** Azure West US 2 region (for P1 systems)
- **Backup storage:** Geo-redundant storage with cross-region replication
- **DNS failover:** Azure Traffic Manager with automatic failover

### 3.2 Backup Strategy
- All production databases: Continuous replication + daily full backups
- File storage: Hourly incremental + daily full to geo-redundant storage
- Configuration and code: Git repositories with multi-region mirrors
- Backup encryption: AES-256 with key management in separate region
- Backup testing: Monthly restore validation for P1/P2 systems

### 3.3 Failover Procedures
- **Automated failover:** P1 systems fail over automatically via Azure Traffic Manager
- **Manual failover:** P2-P4 systems require IT Operations team initiation
- **Failover testing:** Quarterly planned failover drills (announced)
- **Failback:** After primary region restoration, tested during maintenance window

---

## 4. Emergency Response

### 4.1 Crisis Management Team
- **Crisis Commander:** VP of Operations (primary), CTO (backup)
- **Communications Lead:** VP of Marketing
- **IT Operations Lead:** Director of Infrastructure
- **Security Lead:** CISO
- **HR Lead:** VP of People
- **Legal:** General Counsel
- **Business Unit Leads:** VP of each affected delivery unit

### 4.2 Activation Criteria
The Business Continuity Plan is activated when:
- A disruptive event impacts or threatens to impact critical business functions
- The event is expected to exceed normal incident response capabilities
- Multiple locations or business units are affected simultaneously
- Client delivery capability is significantly impaired
- Employee safety is at risk

### 4.3 Communication During Crisis
- **Employee notification:** Mass notification system (Everbridge) via SMS, email, phone
- **Client communication:** Account Managers notify affected clients within 2 hours
- **Leadership updates:** Every 2 hours during active crisis
- **All-hands briefing:** Within 24 hours of activation for company-wide awareness

---

## 5. Pandemic and Health Emergency

### 5.1 Preparedness
- 100% remote work capability for all non-facilities roles
- Cloud-based systems accessible from any location
- VPN capacity sized for full-company concurrent use
- Communication tools (Teams, Slack) accessible without VPN

### 5.2 Response Levels

| Level | Trigger | Actions |
|-------|---------|---------|
| Watch | Reports of emerging health threat | Monitor situation, review preparedness |
| Advisory | Local cases confirmed in Perficient office areas | Optional remote work, enhanced cleaning |
| Elevated | Community spread in office locations | Recommended remote work, limit travel |
| Critical | Government mandates or significant employee impact | Mandatory remote work, all travel suspended |

### 5.3 Employee Support During Health Emergencies
- Additional sick leave (up to 10 extra days for pandemic-related illness)
- Flexible working arrangements for caregiving responsibilities
- Mental health resources and EAP access expanded
- Equipment delivery to support home working if needed

---

## 6. Workplace Recovery

### 6.1 Alternate Work Locations
If a Perficient office becomes unavailable:
- **Primary alternate:** Work from home (all employees equipped)
- **Secondary:** Partner coworking spaces (WeWork corporate account)
- **Tertiary:** Nearest alternative Perficient office
- **Client sites:** Continue on-site work if client facility is unaffected

### 6.2 Essential Personnel
Employees designated as "essential" must be available during disruptions:
- IT Operations team (infrastructure recovery)
- Security Operations team (monitoring and response)
- Executive Leadership (decision-making)
- Communications team (stakeholder updates)
- Facilities team (physical infrastructure)

Essential personnel receive additional compensation for crisis duty: 1.5x hourly rate or comp time equivalent.

---

## 7. Testing and Maintenance

### 7.1 Testing Schedule
- **Monthly:** Backup restoration test (rotating P1/P2 systems)
- **Quarterly:** Failover drill for P1 systems (controlled, announced)
- **Semi-annual:** Tabletop exercise with Crisis Management Team
- **Annual:** Full business continuity exercise (simulated multi-day disruption)

### 7.2 Plan Maintenance
- Annual full review and update of all BCP/DR documentation
- Update triggered by: organizational changes, new critical systems, technology changes, lessons from exercises or actual events
- All changes approved by VP of Operations and CISO
- Current version maintained in both primary and secondary locations

### 7.3 Success Metrics
- RTO achieved in testing: Target 100% of exercises
- RPO validated: Monthly backup testing confirms data integrity
- Employee notification: 95% reached within 30 minutes
- Plan currency: All sections reviewed within 12 months

---

## 8. Roles and Responsibilities

### 8.1 All Employees
- Maintain current contact information in emergency notification system
- Know evacuation routes and assembly points for their office
- Keep work laptop charged and available for remote work
- Follow crisis communication instructions promptly
- Report situations that may require BCP activation

### 8.2 Managers
- Maintain current team contact lists
- Conduct team-level business impact assessments annually
- Identify essential personnel and alternates for their teams
- Communicate BCP expectations to team members
- Participate in tabletop exercises when invited

### 8.3 IT Operations
- Maintain all backup and recovery systems
- Conduct regular failover testing
- Document recovery procedures with step-by-step runbooks
- Ensure infrastructure capacity for full remote work
- Coordinate with vendors during recovery operations
