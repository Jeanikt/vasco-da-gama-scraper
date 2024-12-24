# Vasco da Gama Web Scraper

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Configuration](#configuration)
8. [Database Schema](#database-schema)
9. [How It Works](#how-it-works)
10. [Extending the Scraper](#extending-the-scraper)
11. [Error Handling](#error-handling)
12. [Logging](#logging)
13. [Contributing](#contributing)
14. [License](#license)
15. [Disclaimer](#disclaimer)

## Introduction

The Vasco da Gama Web Scraper is a Node.js application designed to collect and store information about the Vasco da Gama football club. This tool systematically extracts data from the official Vasco da Gama website, including player details, recent news articles, and match results. The scraped information is then stored in a SQLite database for easy access and analysis.

This project aims to provide fans, analysts, and researchers with up-to-date and comprehensive data about Vasco da Gama, facilitating various types of analysis and applications.

## Features

- **Player Information Scraping**: Extracts detailed player data including:
  - Name
  - Position
  - Jersey number
  - Nationality
  - Birth date
  - Height
  - Weight
- **News Article Collection**: Gathers the latest news articles related to Vasco da Gama, including:
  - Article title
  - Content snippet
  - Publication date
  - Article URL
- **Match Results and Fixtures**: Collects information about recent and upcoming matches:
  - Match date
  - Competition name
  - Opponent team
  - Match result (for completed matches)
  - Score (for completed matches)
- **Data Storage**: All scraped information is stored in a SQLite database for persistence and easy querying.
- **Robust Scraping Mechanism**: Implements rate limiting and retry logic to ensure reliable data collection.
- **Configurable**: Easily adjustable scraping intervals and other parameters through a configuration file.
- **Comprehensive Logging**: Detailed logging of all operations and errors for monitoring and debugging.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (usually comes with Node.js)
- SQLite3

## Installation

Follow these steps to get your development environment set up:

1. Clone the repository

