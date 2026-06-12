# Perficient Client Engagement Policy

**Effective Date:** January 1, 2024  
**Last Updated:** February 20, 2024  
**Policy Owner:** Chief Delivery Officer  
**Applies To:** All Perficient employees involved in client-facing project delivery

---

## 1. Purpose

This policy establishes standards for client engagement throughout the project lifecycle, ensuring consistent quality, professionalism, and client satisfaction across all Perficient engagements.

---

## 2. Engagement Types

### 2.1 Project Types
- **Fixed Price:** Defined scope, timeline, and deliverables at agreed price
- **Time & Materials (T&M):** Hourly billing with defined roles and estimated effort
- **Managed Services:** Ongoing operational support with SLA-based delivery
- **Staff Augmentation:** Perficient resources embedded in client teams
- **Advisory/Strategy:** Strategic consulting engagements (short-term, high-value)

### 2.2 Engagement Governance
Each engagement must have:
- Signed Statement of Work (SOW) or Master Services Agreement (MSA)
- Assigned Project Manager or Engagement Lead
- Executive Sponsor (Perficient-side)
- Client Sponsor and decision-maker identified
- Communication plan and escalation path

---

## 3. Project Initiation

### 3.1 Kickoff Requirements
Every engagement begins with a formal kickoff that includes:
- Introduction of all team members and roles
- Review of SOW scope, timeline, and success criteria
- Communication plan agreement (frequency, channels, attendees)
- Governance structure (steering committee, change control)
- Risk identification and initial mitigation planning
- Tool and access requirements
- Security and compliance requirements (NDA, data handling)

### 3.2 Team Onboarding
Before client interaction, team members must:
- Complete client-specific onboarding (tools, VPN, access)
- Review SOW and understand scope boundaries
- Understand client industry and business context
- Complete any required client compliance training
- Sign client-specific NDAs if required

---

## 4. Delivery Standards

### 4.1 Quality Expectations
All deliverables must meet:
- Technical quality standards (per Perficient's technical playbooks)
- Client acceptance criteria as defined in the SOW
- Internal peer review before client delivery
- Documentation standards (architecture decisions, runbooks, handoff docs)
- Accessibility standards (WCAG 2.1 AA unless otherwise specified)

### 4.2 Methodology
Perficient supports multiple delivery methodologies:
- **Agile/Scrum:** 2-week sprints, daily standups, sprint reviews, retrospectives
- **SAFe:** For large-scale enterprise engagements with multiple teams
- **Waterfall:** For compliance-driven or hardware-dependent projects
- **Hybrid:** Combination based on client preference and project needs

The delivery methodology is agreed upon during project initiation and documented in the SOW.

### 4.3 Code and Technical Standards
- All code must follow Perficient's coding standards for the relevant technology
- Code reviews required before merging (minimum 1 reviewer)
- Automated testing (unit + integration) with minimum 80% coverage target
- CI/CD pipelines for all software delivery projects
- Security scanning (SAST/DAST) integrated into pipelines
- Performance testing for applications expecting >1,000 concurrent users

---

## 5. Communication Standards

### 5.1 Status Reporting
- **Weekly status reports:** Sent to client stakeholders every Friday by 3 PM client time
- **Format:** Progress summary, milestones, risks/issues, upcoming activities, budget burn
- **Monthly executive summary:** For steering committee review
- **Ad-hoc escalation:** Immediately for blockers or scope-impacting issues

### 5.2 Meeting Cadence
Standard meeting cadence (adjustable per client preference):
- Daily standup: 15 minutes, team-level
- Weekly status: 30 minutes, PM and client PM
- Bi-weekly steering: 1 hour, leadership-level
- Monthly business review: 1 hour, executive sponsors

### 5.3 Responsiveness
- Client emails: Acknowledge within 4 business hours, full response within 24 hours
- Critical issues: Respond within 1 hour during business hours
- Voicemail: Return within 4 business hours
- After-hours: Per SLA terms (Managed Services may have 24/7 requirements)

---

## 6. Scope and Change Management

### 6.1 Scope Boundaries
- Deliver only what is defined in the SOW
- Document any requests that fall outside scope
- Do not begin work on out-of-scope items without approved change order
- Proactively communicate when scope boundaries are being approached

### 6.2 Change Control Process
1. Client or Perficient identifies potential change
2. PM documents the Change Request (CR) with impact analysis (timeline, cost, resources)
3. CR reviewed with client stakeholders
4. Client approves or declines CR in writing
5. If approved: SOW amendment executed, project plan updated
6. If declined: Document decision and continue per original scope

### 6.3 Change Request Thresholds
- Minor changes (<$5,000 or <1 week impact): PM approval
- Moderate changes ($5,000-$50,000): Director approval
- Major changes (>$50,000 or >1 month impact): VP and client executive approval

---

## 7. Risk Management

### 7.1 Risk Identification
Teams must actively identify and manage risks:
- Technical risks (complexity, dependencies, unknowns)
- Resource risks (availability, skills gaps, turnover)
- Schedule risks (dependencies, client availability, approval delays)
- Budget risks (scope creep, estimation accuracy)
- External risks (vendor dependencies, regulatory changes)

### 7.2 Risk Register
- Maintain a project risk register from kickoff through closure
- Review and update risks weekly in team meetings
- Assign owners and mitigation actions to all Medium+ risks
- Escalate High and Critical risks to steering committee

### 7.3 Escalation Path
1. Project Manager (first attempt at resolution)
2. Delivery Director (if unresolved within 48 hours)
3. Account Executive + VP Delivery (if unresolved within 1 week)
4. Executive Sponsors (if relationship-impacting)

---

## 8. Client Satisfaction

### 8.1 Feedback Collection
- Mid-project satisfaction survey (for engagements >3 months)
- End-of-project satisfaction survey (mandatory for all engagements)
- Annual relationship health survey (for ongoing client relationships)
- Net Promoter Score (NPS) tracked at account and company level

### 8.2 Satisfaction Targets
- Project NPS target: 50+
- Overall client satisfaction: 4.2+/5.0
- Repeat business rate: 70%+ of revenue from existing clients

### 8.3 Addressing Dissatisfaction
If client satisfaction score falls below 3.5/5.0:
1. PM and Account Executive meet with client within 48 hours
2. Root cause analysis and corrective action plan developed
3. VP review and additional resources deployed if needed
4. Follow-up satisfaction check within 30 days
5. Lessons learned shared across delivery organization

---

## 9. Project Closure

### 9.1 Closure Checklist
- [ ] All deliverables accepted by client
- [ ] Knowledge transfer completed
- [ ] Documentation finalized and delivered
- [ ] Source code and assets transitioned per SOW
- [ ] Outstanding invoices sent and reconciled
- [ ] Client satisfaction survey completed
- [ ] Access and credentials revoked
- [ ] Team performance reviews completed
- [ ] Lessons learned documented
- [ ] Case study opportunity assessed

### 9.2 Knowledge Transfer
Before project closure, ensure:
- Operations/support team trained on delivered solution
- Runbooks and troubleshooting guides delivered
- Architecture documentation complete
- Admin guides for configuration and maintenance
- Warranty period and support terms clearly communicated

---

## 10. Intellectual Property

### 10.1 Default IP Terms
Unless otherwise specified in the SOW:
- **Custom deliverables:** Client owns IP rights to custom work product
- **Pre-existing IP:** Perficient retains ownership of frameworks, accelerators, and tools developed prior to or independent of the engagement
- **Licensed components:** Third-party components are governed by their respective licenses

### 10.2 Perficient Accelerators
Perficient's proprietary accelerators and frameworks may be used in client projects with appropriate licensing:
- Accelerators remain Perficient IP
- Client receives a perpetual, non-exclusive license to use
- Modifications to accelerators during the engagement: Joint ownership per SOW terms
