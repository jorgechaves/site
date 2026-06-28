## ADDED Requirements

### Requirement: Contact lead-capture form
The website SHALL provide a contact form in a dedicated Contact section that collects at minimum the visitor's name, email, and message. The form SHALL validate that required fields are filled and that the email has a valid format before submission.

#### Scenario: Successful submission
- **WHEN** a visitor fills in a valid name, email, and message and submits the form
- **THEN** the form is accepted and the visitor sees a success confirmation message

#### Scenario: Validation error
- **WHEN** a visitor submits the form with a missing required field or an invalid email
- **THEN** submission is blocked and an inline validation message indicates the problem

### Requirement: Primary call-to-action
The website SHALL provide a primary call-to-action (e.g., "Fale Conosco" / "Solicite um Orçamento") in the hero section that directs the visitor to the Contact section.

#### Scenario: Hero CTA navigates to contact
- **WHEN** a visitor clicks the primary call-to-action in the hero
- **THEN** the page scrolls to the Contact section

### Requirement: Company contact information
The Contact section SHALL display company contact details (such as email and/or social/professional links) alongside the form.

#### Scenario: Contact details visible
- **WHEN** a visitor views the Contact section
- **THEN** company contact information is displayed in addition to the form
