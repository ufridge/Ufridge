# UFridge – Student Refrigerator Rental

UFridge is a lightweight MVP (Minimum Viable Product) platform designed to help students rent refrigerators easily and affordably. By streamlining the rental process, UFridge provides an accessible, fast, and clean solution for dormitory and campus living.

## Demo

Check out the live website:  
[https://ufridge.co](https://ufridge.co)

## Key Features

- **Browse available refrigerator models:** View detailed information on dimensions, capacity, and pricing.
- **View rental plans:** Flexible leasing options by semester or academic year.
- **Submit rental requests through an embedded form:** A seamless mobile-friendly checkout experience.
- **Automatic order collection via Google Sheets:** Instantly records and organizes incoming requests.
- **Mobile-friendly interface:** Built from the ground up to be easily usable on smartphones.

## System Architecture

To maximize speed and maintain a lean operational overhead for our MVP phase, UFridge utilizes a 100% serverless architecture:

```text
User
  ↓
UFridge Website (GitHub Pages)
  ↓
Embedded Order Form
  ↓
Google Apps Script API
  ↓
Google Sheets (Order Database)
```

This architecture allows us to operate without traditional backend servers or complex database configurations, providing a highly scalable, free, and instantly accessible CRM workflow out of the box.

## Tech Stack

### Frontend
- **HTML5** & **CSS3**
- **Vanilla JavaScript**
- **PicoCSS** (Minimalist, lightweight CSS framework for clean native styling)

### Backend (Serverless)
- **Google Apps Script** (Serves as the lightweight POST API)
- **Google Sheets** (Serves as the real-time database)

### Hosting
- **GitHub Pages** (Continuous delivery and static hosting)

## Project Structure

```text
/
├── index.html       # Landing page and product catalog
├── order.html       # Embedded rental request form
├── css/             # Stylesheets (PicoCSS extensions and custom styling)
├── js/              # Client-side logic and form submission handler
├── images/          # Product images and branding assets
├── product/         # Detail pages for specific refrigerator models
├── manifest.json    # PWA configuration
├── sw.js            # Service worker for offline caching
└── README.md        # Project documentation
```

## Future Roadmap

As we scale beyond the MVP phase, we plan to implement the following features:

- Progressive Web App (PWA) support *(Currently in progress)*
- Mobile app-like installation for seamless access
- Centralized order management dashboard for admins
- LINE notification integration for instant customer updates
- Rental status tracking for active users

## Contributing

UFridge is currently an MVP project running active service tests. At this time, we are not actively accepting open-source pull requests outside of the core management team.

## License

This project is licensed under the [MIT License](LICENSE).