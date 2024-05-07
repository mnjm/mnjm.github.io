---
title: "Alacritty and TMUX: Preventing Duplicate Instances"
date: 2024-05-05T19:58:09+05:30
tags: []
categories: []
series: []
---

Three years ago, I made the switch to using TMUX with aim of simplicity. The idea was straightforward: One terminal window opened with multiple TMUX sessions, each catering to different tasks. This eliminates sifting through terminal windows when searching and prevents killing processes when a terminal window is accidentally closed.

When it comes to Terminal Emulator, I quickly landed on Alacritty because of 3 reasons.

1. It is blazingly fast compared to other terminals out there, as it relies on GPU for rendering.
2. It is minimal and conservative when it comes to features. It doesn't support tabs or splits; instead, it expects users to rely on external applications like TMUX for that purpose. It also offers extensive configuration options, but without any GUI for such configurations, relying on a text file.
3. It renders everything properly without any artifacts and is widely supported across many platforms.

To automatically start TMUX whenever you launch Alacritty, simply add the following lines to your Alacritty configuration file:

```toml
[shell]
args = ["--login", "-c", "tmux -u attach || tmux -u new -s default"]
program = "/usr/bin/zsh"
```
Replace `/usr/bin/zsh` with the path to your preferred shell.

Although this setup works well, there are times where I unintentionally create multiple Alacritty instances connected to the same TMUX session, which can get annoying. To address this, I came up with a command that checks for any active Alacritty windows, If one's found, it will focus on that; otherwise it will create a new instance.

### Command
```bash
xdotool windowactivate $(xdotool search --classname Alacritty) || alacritty
```
This command uses `xdotool` to check and focus on windows, which can be installed using `sudo apt install xdotool` on any Debian based distros.

For some reason, I faced difficulties adding this command as a Cinnamon keybinds. Consequently, I opted to create a script with added nicities.

### Script Version

```bash
#!/usr/bin/env zsh

local alacritty_class_name="Alacritty"

fail() {
    notify-send --urgency=normal $1
}

alacritty_one_instance() {
    # get window id, if more than 1 window found, select the last one
    local window_id=$(xdotool search --classname $alacritty_class_name | tail -n1)
    if [[ -n $window_id ]]; then
        # focus window
        xdotool windowactivate $window_id || fail "Error: couldnt focus on alacritty window"
    else
        alacritty --class $alacritty_class_name || fail "Error: Alacritty instance creation"
    fi
}
alacritty_one_instance
```

All that's needed is to place this script in a directory listed in `$PATH`, such as `~/.local/bin`, grant it execution permissions, and bind it to a key (e.g., `Super-Enter`) in the Desktop Manager (like Cinnamon).
