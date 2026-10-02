# RouteBack — Refund Copilot

An AI-assisted product prototype that helps bus-ticket customers understand their estimated refund before cancelling.

## Problem

Bus cancellation policies can vary by operator and by time before departure. Customers often have to interpret multiple cancellation slabs themselves before deciding whether to cancel.

RouteBack converts those rules into:

- An estimated refund amount
- A transparent refund calculation
- A time-based refund explanation
- A comparison of how the refund can change if cancellation happens later

## Features

- Time-based refund estimation
- Operator policy selection
- Transparent refund calculation
- ₹15 platform cancellation fee modeled separately
- "What if I cancel later?" scenario comparison
- Copilot-style natural-language explanation
- Responsive web interface

## How it works

1. Enter the amount paid and original fare.
2. Enter the departure date and time.
3. RouteBack determines the applicable cancellation window.
4. The policy engine calculates the estimated refund.
5. The Copilot explains the result in plain language.
6. The scenario simulator shows how timing could affect the refund.

## AI-Assisted Development

AI was used as a development partner throughout the MVP process for:

- Product ideation
- UI structure and styling
- JavaScript implementation
- Debugging
- Iteration on the refund calculation
- Improving the user-facing explanations

I reviewed the generated logic rather than accepting it blindly. During testing, I noticed that interpreting policy percentages as cancellation charges versus refund percentages could produce a very different customer outcome. I questioned the result, reviewed the underlying policy interpretation, and changed the prototype to make the customer-facing refund percentage explicit.

For monetary calculations, the prototype uses deterministic JavaScript rather than asking an LLM to calculate financial values.

## Tech Stack

- HTML
- CSS
- JavaScript
- AI-assisted development

## Status

Working MVP / independent product prototype.

This project is not connected to any live booking, payment, or operator system.
