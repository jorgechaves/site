## ADDED Requirements

### Requirement: Dedicated service URLs
The website SHALL provide crawlable, clean service URLs for Business Intelligence, Banco de Dados, ETL/ELT, and Infraestrutura de Dados.

#### Scenario: Service pages are reachable
- **WHEN** a visitor opens `/business-intelligence`, `/banco-de-dados`, `/etl-elt`, or `/infraestrutura-de-dados`
- **THEN** the visitor sees a service-specific landing page for the matching ClixData service
- **AND** the page can be reached from the homepage services section

#### Scenario: Service pages link to conversion
- **WHEN** a visitor views any service page
- **THEN** the page includes a clear call-to-action that navigates to contact or lead capture
- **AND** the page includes navigation back to the homepage and related services

### Requirement: Search metadata per page
Each homepage and service page SHALL define unique search metadata aligned with its page intent.

#### Scenario: Homepage metadata
- **WHEN** a crawler reads the homepage document head
- **THEN** the title includes "Consultoria em BI, Banco de Dados e ETL | ClixData"
- **AND** the meta description summarizes dashboards Power BI, SQL/Python automation, ETL/ELT, and banco de dados benefits
- **AND** the canonical URL points to the homepage canonical address

#### Scenario: Service page metadata
- **WHEN** a crawler reads any service page document head
- **THEN** the title, description, H1, and canonical URL are unique to that service
- **AND** they use natural pt-BR keywords for the matching service without duplicating the homepage metadata verbatim

### Requirement: Social sharing metadata and image
The website SHALL provide Open Graph and X/Twitter metadata suitable for WhatsApp, LinkedIn, Google, and other link previews.

#### Scenario: Social preview metadata exists
- **WHEN** a crawler reads the homepage or any service page document head
- **THEN** it finds `og:type`, `og:title`, `og:description`, `og:url`, `og:locale`, and `og:image`
- **AND** it finds equivalent X/Twitter card metadata

#### Scenario: Social image loads
- **WHEN** the `og:image` URL is requested
- **THEN** it resolves to a branded image asset appropriate for ClixData
- **AND** the image has dimensions suitable for common social previews

### Requirement: Structured data
The website SHALL include valid JSON-LD structured data for the organization, professional service, service catalog, contact point, and individual services.

#### Scenario: Homepage structured data
- **WHEN** a crawler reads the homepage
- **THEN** it finds JSON-LD describing ClixData Dados & BI as an Organization or ProfessionalService
- **AND** the data includes canonical URL, logo URL, area served, contact information, and offered services

#### Scenario: Service structured data
- **WHEN** a crawler reads a service page
- **THEN** it finds JSON-LD describing the specific Service represented by that page
- **AND** the service data references ClixData Dados & BI as provider

### Requirement: Crawl discovery files
The website SHALL expose static crawl discovery files for search engines.

#### Scenario: Robots file
- **WHEN** `/robots.txt` is requested
- **THEN** it allows normal crawling of public pages
- **AND** it references the sitemap URL

#### Scenario: Sitemap file
- **WHEN** `/sitemap.xml` is requested
- **THEN** it lists the homepage and all service URLs
- **AND** each listed URL uses the canonical production domain

### Requirement: Natural SEO copy and trust content
The website SHALL include useful, truthful content that supports search intent and visitor trust without fabricating proof.

#### Scenario: Service copy answers buyer questions
- **WHEN** a visitor reads a service page
- **THEN** the page explains the service, problems solved, technologies used, expected deliverables, process, and fit for relevant sectors
- **AND** the copy naturally includes service keywords such as consultoria em Business Intelligence, dashboards Power BI, SQL, Python, ETL, ELT, administracao de banco de dados, engenharia de dados, and infraestrutura de dados where relevant

#### Scenario: Trust content avoids unsupported claims
- **WHEN** the site displays trust-building content
- **THEN** it does not show fake testimonials, fake clients, fake case metrics, fake ratings, or unsupported awards
- **AND** any examples are framed as service examples or typical deliverables rather than claimed client results

### Requirement: Image performance and accessibility
The website SHALL optimize brand images used in navigation, content, and social previews for performance and accessibility.

#### Scenario: Logo image is efficient
- **WHEN** the homepage or a service page renders the header logo
- **THEN** the logo uses explicit dimensions or CSS sizing that prevents layout shift
- **AND** the image file size is reasonable for repeated navigation use

#### Scenario: Informative images have accessible text
- **WHEN** an image conveys meaningful page content
- **THEN** it includes descriptive alternative text
- **AND** decorative images are hidden from assistive technology
