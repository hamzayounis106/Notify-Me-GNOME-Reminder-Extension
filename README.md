# Notify Me - GNOME Shell Extension

A simple and intuitive reminder/notification extension for GNOME Shell that helps you stay on top of your tasks and appointments.

## Features

- **Custom Reminders**: Set personalized reminder messages
- **Flexible Timing**: Choose any time duration in minutes
- **Quick Time Buttons**: Fast access to common reminder times (1, 5, 10, 30 minutes)
- **Multiple Reminders**: Set multiple reminders simultaneously
- **Cancel All**: Easily cancel all active reminders
- **Clean Interface**: Minimalist design that integrates seamlessly with GNOME Shell
- **System Notifications**: Uses native GNOME notifications

## Installation

### Manual Installation

1. Clone or download this repository
2. Copy the extension folder to your GNOME Shell extensions directory:
   ```bash
   cp -r notifyme@luminex ~/.local/share/gnome-shell/extensions/
   ```
3. Restart GNOME Shell:
   - Press `Alt + F2`, type `r`, and press Enter (X11)
   - Or log out and log back in (Wayland)
4. Enable the extension using GNOME Extensions app or via command line:
   ```bash
   gnome-extensions enable notifyme@luminex
   ```

### Using GNOME Extensions Website

_This extension is not yet available on the GNOME Extensions website._

## Usage

1. **Access the Extension**: Click on the alarm icon in the top panel
2. **Set a Message**: Enter your reminder message in the text field (default: "Your reminder is ready!")
3. **Choose Time**:
   - Enter time manually in minutes in the time field
   - Or use the quick time buttons (1m, 5m, 10m, 30m)
4. **Set Reminder**: Click "Set Reminder" to activate
5. **Manage Reminders**: Use "Cancel All Reminders" to stop all active reminders

## Configuration

The extension works out of the box with no additional configuration required. All settings are accessible through the panel menu.

## Compatibility

- **GNOME Shell Version**: 42
- **Tested On**: GNOME 42+
- **Platform**: Linux

## File Structure

```
notifyme@luminex/
├── extension.js      # Main extension logic
├── metadata.json     # Extension metadata
├── stylesheet.css    # Custom styling
└── README.md         # This file
```

## Development

### Code Overview

- `extension.js`: Contains the main `NotifyMeIndicator` class that creates the panel button and menu interface
- `metadata.json`: Defines extension properties and GNOME Shell compatibility
- `stylesheet.css`: Provides custom styling for the extension's UI elements

### Key Components

- **Panel Indicator**: Alarm icon in the top panel
- **Popup Menu**: Interface for setting reminders with message and time inputs
- **Timeout Management**: Tracks and manages multiple active reminders
- **Notification System**: Uses GNOME's native notification system

## Troubleshooting

### Extension Not Appearing

- Ensure you've restarted GNOME Shell after installation
- Check that the extension is enabled: `gnome-extensions list --enabled`
- Verify the extension folder is in the correct location

### Notifications Not Working

- Check that GNOME notifications are enabled in system settings
- Ensure the extension has permission to send notifications

### Reset Extension

```bash
gnome-extensions disable notifyme@luminex
gnome-extensions enable notifyme@luminex
```

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup

1. Clone the repository
2. Make your changes
3. Test with: `gnome-extensions enable notifyme@luminex`
4. Submit a pull request

## License

This project is open source. Please see the license file for details.

## Changelog

### Version 2

- Initial release
- Basic reminder functionality
- Custom message and timing
- Quick time buttons
- Multiple reminder support
- Cancel all reminders feature

## Support

If you encounter any issues or have feature requests, please open an issue on the project repository.

---

_Made with ❤️ for the GNOME community_
