---
title: "Crossplane resources in Neovim"
date: 2024-03-31
tags: ["crossplane", "neovim"]
---

# Introduction

In the realm of text editors, Neovim stands out for its extensibility, especially for developers working with Kubernetes. The telescope-crossplane.nvim extension bridges the gap between Neovim's editing capabilities and Kubernetes resource management. This tutorial outlines the prerequisites, installation, and setup processes for integrating telescope-crossplane.nvim into Neovim, providing an efficient way to manage Kubernetes resources.

## Prerequisites

Obviously some familiarity with Crossplane plus the following installed.

- Neovim version 0.9.0 or higher.
- The telescope.nvim plugin
- kubectl

## Installation

Installation of telescope-crossplane.nvim can be achieved through various plugin managers. A popular choice is packer.nvim. To install, include the following in the Neovim configuration file (init.lua):

```lua
use { "Piotr1215/telescope-crossplane.nvim",
  requires = { { 'nvim-telescope/telescope.nvim' } },
  config = function()
    require("telescope").load_extension("telescope-crossplane")
  end
}
```

## Setup and Usage

Once installed, telescope-crossplane.nvim offers two commands that enhance Kubernetes management:

    :Telescope telescope-crossplane crossplane_managed for managing Crossplane resources.
    :Telescope telescope-crossplane crossplane_resources for a broader view of Kubernetes resources.

These commands can be executed directly in Neovim, bringing Kubernetes resource management into the editor.

This integration significantly reduces context switching, as developers can view, edit, and manage Kubernetes resources without leaving their coding environment.

Benefits of Integration

Integrating telescope-crossplane.nvim with Neovim offers several advantages:

    Streamlines Kubernetes workflows by bringing kubectl functionalities into Neovim.
    Enhances productivity by reducing the need to switch between terminal and editor.
    Offers a unified interface for code and Kubernetes resource management.

## Conclusion

Neovim is a very extensible editor, lua is easy to learn and plugins not that difficult. It might be some learning at the beginning, but it’s well worth it.

The workflow with editing Crossplane resources (or any kubernetes resources for the matter) is a very common one. Deleting finalizes, adding/removing annotations etc. It’s all about staying in the flow and not leaving your main development environment.
