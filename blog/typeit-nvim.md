title: Typing Simulation in Neovim with typeit.nvim
description: Typing simulation in Neovim with typeit.nvim
date: 2024-07-04
tags: [neovim,plugin ]
hide_table_of_contents: false
![Photo by [Andrew
Seaman](https://unsplash.com/@amseaman?utm_source=medium&utm_medium=referral)
on
[Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)](_media/580689_image0.jpg)


<!-- truncate -->

# Typing Simulation in Neovim with typeit.nvim

## Neovim plugin useful for technical presentations from a terminal

# Introduction

As a developer who frequently gives technical presentations and demos
from the terminal, I’ve always been drawn to Neovim’s extensibility.
It’s a powerful feature, especially for those of us creating
tutorials, demos, or presentations. That’s why I created `typeit.nvim`.

Over the years, I’ve found that live coding during presentations can be
risky — typos, mistakes, and the pressure of an audience can sometimes
lead to less-than-smooth demonstrations. On the other hand, pre-recorded
videos or static code snippets often lack the dynamism that keeps an
audience engaged. I needed something in between, and that’s where the
idea for `typeit.nvim` was born.

I leveraged Neovim’s extensibility to create a plugin that allows
presenters to simulate typing in real-time, complete with customizable
typing speed. Whether you’re creating tutorials, giving live demos, or
just want to add some flair to your coding screencasts, `typeit.nvim`
can help bring your code to life.

In this blog post, I’ll guide you through the features, installation,
configuration, and usage of `typeit.nvim`. By the end, you'll have a new
tool in your Neovim arsenal for creating more engaging and realistic
coding demonstrations, enhancing your Neovim experience.

# Prerequisites

Before diving into the installation and setup of `typeit.nvim`, ensure
you have the following:

  - Neovim version 0.9.0 or higher
  - A plugin manager such as, `packer.nvim`, or
    `lazy.nvim`

# Installation

You can install `typeit.nvim` using various plugin managers. Below are
the instructions for the three popular options:

## Using [packer.nvim](https://github.com/wbthomason/packer.nvim)

```bash
use 'Piotr1215/typeit.nvim'
```

## Using [lazy.nvim](https://github.com/folke/lazy.nvim)

```bash
{
    'Piotr1215/typeit.nvim',
    config = function()
        require('typeit').setup({
            -- Your configuration here
        })
    end
}
```

# Configuration

After installation, you can configure `typeit.nvim` globally using the
`setup` function. Here’s a basic example:

```bash
require('typeit').setup({
    default_speed = 30,    -- Default typing speed (milliseconds)
    default_pause = 'line' -- Default pause behavior ('line' or 'paragraph')
})
```

# Usage

## Vim Commands

`typeit.nvim` provides several commands for simulating typing in Neovim:

  - `:SimulateTyping [file_path] [speed]`: Simulate
    typing from a file
  - `:SimulateTypingWithPauses [file_path] [speed]
    [pause_at]`: Simulate typing with pauses (‘line’ or
    ‘paragraph’)
  - `:StopTyping`: Stop the current typing
    simulation

## Simulating Typing from a File

To simulate typing the contents of a file:

1.  Open a new empty buffer: `:enew`
2.  Use the `SimulateTyping` command:

<!-- end list -->

```bash
:SimulateTyping ~/example.txt 30
```

This command simulates typing the contents of `example.txt` at a speed
of 30 milliseconds per character.

## Simulating Typing with Pauses

To simulate typing with pauses between lines or paragraphs:

1.  Open a new empty buffer: `:enew`
2.  Use the `SimulateTypingWithPauses` command:

<!-- end list -->

```bash
:SimulateTypingWithPauses ~/example.txt 50 line
```

This command pauses after each line at a typing speed of 50 milliseconds
per character. For paragraph pauses, use:

```bash
:SimulateTypingWithPauses ~/example.txt 50 paragraph
```

## Simulating Custom Text Typing

You can also simulate typing custom text directly in Neovim:

1.  Open a new empty buffer: `:enew`
2.  Enter command mode and type your text in
    quotes:

<!-- end list -->

```bash
:call luaeval("require('typeit').simulate_typing(_A[1], _A[2])", ["This is a custom text being typed out.", 40])
```

This command simulates typing “This is a custom text being typed out.”
at a speed of 40 milliseconds per character.

For custom text with pauses:

```bash
:call luaeval("require('typeit').simulate_typing_with_pauses(_A[1], _A[2], _A[3])", ["Line 1\nLine 2\nLine 3", "line", 30])
```

This simulates typing the given lines with pauses after each line at a
speed of 30 milliseconds per character.

## Stopping the Simulation

To stop the typing simulation at any point, use:

```bash
:StopTyping
```

Alternatively, you can use `Ctrl+C` to interrupt the typing simulation.

# Custom Keybindings

Set up custom keybindings for `typeit.nvim` commands:

```bash
vim.api.nvim_set_keymap('n', '<leader>st', ':SimulateTyping<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>sp', ':SimulateTypingWithPauses<CR>', { noremap = true, silent = true })
```

# Conclusion

`typeit.nvim` is a versatile plugin that brings dynamic typing
simulations to Neovim, making it perfect for live demos, tutorials, and
presentations. By integrating this plugin into your workflow, you can
create more engaging content and showcase your coding skills in
real-time.

Thanks for taking the time to read this post. I hope you found it
interesting and informative.

🔗 **Connect with me on**
[**LinkedIn**](https://www.linkedin.com/in/piotr-zaniewski/)

📺 **Subscribe to my** [**YouTube
Channel**](https://www.youtube.com/@cloud-native-corner)
