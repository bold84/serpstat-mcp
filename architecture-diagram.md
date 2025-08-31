# Domain Analysis API MCP Server Architecture

## System Architecture Overview

```mermaid
graph TB
    subgraph "MCP Client"
        A[User/Agent] --> B[MCP Protocol]
        B --> C[Tool Discovery]
        B --> D[Tool Execution]
    end
    
    subgraph "Domain Analysis API Server"
        C --> E[Server Entry Point]
        E --> F[Request Handler]
        
        subgraph "Core Infrastructure"
            F --> G[Authentication Handler]
            F --> H[API Client]
            F --> I[Error Handler]
            F --> J[Validator]
        end
        
        subgraph "Domain Analysis Methods"
            D --> K[getDomainsInfo]
            D --> L[getDomainKeywords]
            D --> M[getAdKeywords]
            D --> N[getCompetitors]
            D --> O[getAdsCompetitors]
            D --> P[getOrganicCompetitorsPage]
            D --> Q[getTopUrls]
            D --> R[getDomainUrls]
            D --> S[getDomainsHistory]
            D --> T[getDomainsIntersection]
            D --> U[getDomainsUniqKeywords]
            D --> V[getAllRegionsTraffic]
            D --> W[getRegionsCount]
            D --> X[exportPositions]
        end
        
        subgraph "Shared Utilities"
            G --> Y[Environment Config]
            H --> Z[API Request Builder]
            I --> AA[Error Response Formatter]
            J --> AB[Zod Schema Validator]
        end
    end
    
    subgraph "External Services"
        K --> S1[Serpstat API]
        L --> S1
        M --> S1
        N --> S1
        O --> S1
        P --> S1
        Q --> S1
        R --> S1
        S --> S1
        T --> S1
        U --> S1
        V --> S1
        W --> S1
        X --> S1
    end
    
    subgraph "Data Flow"
        D --> F
        F --> G
        G --> H
        H --> J
        J --> K
        J --> L
        J --> M
        J --> N
        J --> O
        J --> P
        J --> Q
        J --> R
        J --> S
        J --> T
        J --> U
        J --> V
        J --> W
        J --> X
        K --> S1
        S1 --> K
        K --> I
        I --> D
    end
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User/Agent
    participant MCP as MCP Protocol
    participant S as Domain Analysis Server
    participant API as Serpstat API
    participant DB as Serpstat Database

    U->>MCP: Tool Discovery Request
    MCP->>S: List Tools
    S->>MCP: Return Available Tools
    
    U->>MCP: Tool Call Request
    MCP->>S: Execute Tool
    S->>S: Validate Input
    S->>S: Authenticate Request
    S->>API: Build API Request
    API->>DB: Query Database
    DB-->>API: Return Data
    API-->>S: Return Response
    S->>S: Format Response
    S->>MCP: Return MCP Response
    MCP-->>U: Return Tool Result
```

## Method Categories and Relationships

```mermaid
graph TD
    subgraph "Domain Analysis Methods"
        subgraph "Core Domain Analysis"
            A[getDomainsInfo]
            B[getDomainKeywords]
            C[getDomainUrls]
        end
        
        subgraph "Competitor Analysis"
            D[getCompetitors]
            E[getAdsCompetitors]
            F[getOrganicCompetitorsPage]
        end
        
        subgraph "Traffic & Performance"
            G[getAllRegionsTraffic]
            H[getRegionsCount]
            I[getDomainsHistory]
        end
        
        subgraph "Multi-Domain Analysis"
            J[getDomainsIntersection]
            K[getDomainsUniqKeywords]
        end
        
        subgraph "URL & Content Analysis"
            L[getTopUrls]
            M[exportPositions]
        end
        
        subgraph "Advertising Analysis"
            N[getAdKeywords]
        end
    end
    
    A --> O[Common Domain Parameter]
    B --> O
    C --> O
    D --> O
    E --> O
    F --> O
    G --> O
    H --> O
    I --> O
    J --> O
    K --> O
    L --> O
    M --> O
    N --> O
    
    O --> P[se: Search Engine]
    O --> Q[domain: Domain Name]
    
    B --> R[Advanced Filtering]
    N --> R
    J --> R
    K --> R
    
    M --> S[CSV Export]
    I --> T[Historical Data]
    
    classDef core fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef competitor fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef traffic fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef multi fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef url fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef advertising fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    
    class A,B,C core
    class D,E,F competitor
    class G,H,I traffic
    class J,K multi
    class L,M url
    class N advertising
```

## Request Processing Pipeline

```mermaid
flowchart LR
    subgraph "Request Processing Pipeline"
        A[Incoming MCP Request] --> B[Input Validation]
        B --> C[Authentication Check]
        C --> D[API Request Construction]
        D --> E[Serpstat API Call]
        E --> F[Response Parsing]
        F --> G[Error Handling]
        G --> H[MCP Response Formatting]
        H --> I[Outgoing MCP Response]
    end
    
    subgraph "Validation Components"
        B --> B1[Zod Schema Validation]
        B --> B2[Parameter Type Checking]
        B --> B3[Search Engine Code Validation]
    end
    
    subgraph "Authentication Components"
        C --> C1[API Key Validation]
        C --> C2[Token Expiry Check]
        C --> C3[Rate Limit Verification]
    end
    
    subgraph "Error Handling Components"
        G --> G1[API Error Mapping]
        G --> G2[Network Error Handling]
        G --> G3[Validation Error Formatting]
    end
```

## Key Components

### 1. MCP Server Infrastructure
- **Entry Point**: Main server initialization with MCP SDK
- **Request Handler**: Processes incoming MCP requests
- **Tool Registry**: Manages available tools and their schemas

### 2. Shared Utilities
- **API Client**: Handles HTTP communication with Serpstat API
- **Authentication**: Manages API key validation and authentication
- **Validator**: Input validation using Zod schemas
- **Error Handler**: Standardized error response formatting

### 3. Method-Specific Handlers
Each of the 15 domain analysis methods has:
- **Input Schema**: Zod validation for parameters
- **Request Builder**: Constructs API request payload
- **Response Parser**: Processes Serpstat API response
- **Output Formatter**: Converts to MCP response format

### 4. External Dependencies
- **Serpstat API**: Primary data source for all domain analysis
- **Environment Variables**: Configuration for API keys and settings
- **TypeScript**: Type safety and development experience

## Security Considerations

```mermaid
graph TB
    subgraph "Security Layers"
        A[Input Validation] --> B[Zod Schema Validation]
        A --> C[Parameter Sanitization]
        
        D[Authentication] --> E[API Key Validation]
        D --> F[Token Expiry Check]
        D --> G[Rate Limiting]
        
        H[Error Handling] --> I[Information Hiding]
        H --> J[Standardized Error Responses]
        
        K[Data Protection] --> L[Response Sanitization]
        K --> M[Credit Information Masking]
    end
    
    A --> N[Prevent Injection Attacks]
    D --> O[Prevent Unauthorized Access]
    H --> P[Prevent Information Leakage]
    K --> Q[Protect Sensitive Data]
```

This architecture provides a solid foundation for building a robust, secure, and maintainable Domain Analysis API MCP server with comprehensive error handling, validation, and standardized responses.