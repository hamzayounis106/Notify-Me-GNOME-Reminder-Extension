const { St, GLib, GObject, Clutter } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

let indicator;

var NotifyMeIndicator = GObject.registerClass(
  class NotifyMeIndicator extends PanelMenu.Button {
    constructor() {
      super(0.0, 'Notify Me');

      // Create icon
      let icon = new St.Icon({
        icon_name: 'alarm-symbolic',
        style_class: 'system-status-icon',
      });
      this.add_child(icon);

      this._createMenu();
    }

    _createMenu() {
      // Title
      let titleItem = new PopupMenu.PopupMenuItem('Set Reminder', {
        reactive: false,
      });
      titleItem.label.style_class = 'popup-menu-item-title';
      this.menu.addMenuItem(titleItem);

      this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

      // Message input section
      let messageSection = new PopupMenu.PopupBaseMenuItem({ reactive: false });
      let messageBox = new St.BoxLayout({
        vertical: true,
        style_class: 'popup-menu-item',
      });

      let messageLabel = new St.Label({ text: 'Message:' });
      messageBox.add_child(messageLabel);

      this._messageEntry = new St.Entry({
        style_class: 'notification-entry',
        hint_text: 'Enter your reminder message...',
        text: 'Your reminder is ready!',
      });
      messageBox.add_child(this._messageEntry);

      messageSection.add_child(messageBox);
      this.menu.addMenuItem(messageSection);

      // Time input section
      let timeSection = new PopupMenu.PopupBaseMenuItem({ reactive: false });
      let timeBox = new St.BoxLayout({
        vertical: true,
        style_class: 'popup-menu-item',
      });

      let timeLabel = new St.Label({ text: 'Time (minutes):' });
      timeBox.add_child(timeLabel);

      this._timeEntry = new St.Entry({
        style_class: 'notification-entry',
        hint_text: 'Enter time in minutes...',
        text: '5',
      });
      timeBox.add_child(this._timeEntry);

      timeSection.add_child(timeBox);
      this.menu.addMenuItem(timeSection);

      this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

      // Quick time buttons
      let quickSection = new PopupMenu.PopupBaseMenuItem({ reactive: false });
      let quickBox = new St.BoxLayout({
        vertical: false,
        style_class: 'popup-menu-item',
        x_expand: true,
      });

      let quickLabel = new St.Label({ text: 'Quick times: ' });
      quickBox.add_child(quickLabel);

      [1, 5, 10, 30].forEach((minutes) => {
        let btn = new St.Button({
          label: `${minutes}m`,
          style_class: 'notification-quick-button',
        });
        btn.connect('clicked', () => {
          this._timeEntry.set_text(minutes.toString());
        });
        quickBox.add_child(btn);
      });

      quickSection.add_child(quickBox);
      this.menu.addMenuItem(quickSection);

      this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

      // Set reminder button
      let setButton = new PopupMenu.PopupMenuItem('Set Reminder');
      setButton.connect('activate', () => {
        this._setReminder();
      });
      this.menu.addMenuItem(setButton);

      // Cancel all reminders button
      let cancelButton = new PopupMenu.PopupMenuItem('Cancel All Reminders');
      cancelButton.connect('activate', () => {
        this._cancelAllReminders();
      });
      this.menu.addMenuItem(cancelButton);

      // Track active timeouts
      this._activeTimeouts = [];
    }

    _setReminder() {
      let message = this._messageEntry.get_text() || 'Your reminder is ready!';
      let timeText = this._timeEntry.get_text() || '5';
      let minutes = parseInt(timeText);

      if (isNaN(minutes) || minutes <= 0) {
        Main.notify('Notify Me', 'Please enter a valid number of minutes');
        return;
      }

      let seconds = minutes * 60;

      Main.notify(
        'Notify Me',
        `Reminder set for ${minutes} minute${minutes > 1 ? 's' : ''}!`
      );

      let timeoutId = GLib.timeout_add_seconds(
        GLib.PRIORITY_DEFAULT,
        seconds,
        () => {
          Main.notify('Notify Me', `⏰ ${message}`);

          // Remove from active timeouts
          let index = this._activeTimeouts.indexOf(timeoutId);
          if (index > -1) {
            this._activeTimeouts.splice(index, 1);
          }

          return GLib.SOURCE_REMOVE;
        }
      );

      // Track this timeout
      this._activeTimeouts.push(timeoutId);

      // Close the menu
      this.menu.close();
    }

    _cancelAllReminders() {
      this._activeTimeouts.forEach((timeoutId) => {
        GLib.source_remove(timeoutId);
      });
      this._activeTimeouts = [];

      Main.notify('Notify Me', 'All reminders cancelled');
      this.menu.close();
    }

    destroy() {
      // Clean up timeouts when extension is disabled
      this._cancelAllReminders();
      super.destroy();
    }
  }
);

function init() {
  // Nothing to do here
}

function enable() {
  indicator = new NotifyMeIndicator();
  Main.panel.addToStatusArea('notify-me', indicator);
}

function disable() {
  if (indicator) {
    indicator.destroy();
    indicator = null;
  }
}
