# Overview

- Created app, here's a link: https://flower-tulip-948431.netlify.app/
- Created posthog instance: https://us.posthog.com
- Let's review the app. It includes 3 types of events, and simulates how it would be implemented in our own app:

  - user email, important to identify stuff later
  - Dayview open event
  - Dayview change event
  - Dayview close event

- Dayview open event is self explanatory

- Dayview change event has some settings. You can choose if it is a success, meaning it reduces error count, or a failure, meaning it does not reduce or increases error count.
- A very important note about failures, which we can discuss later on, is that even though event can move efficiency value towards the limits, and be the correct move, it may not be success, because it may be that say 3 movements are needed.
- Another important thing to understand is that this event actually splits into 3 event names.

  - day view change reducing efficiency error count
  - day view change not reducing efficiency error count
  - day view change <-- this one is always sent. So we always have 2 events sent in case of change. 1 name indicates immediatelly if it's a success or failure, useful in funnels. Another generic name is useful when we want to count the amount of same event based on it's properties. It's probably redundant, but I think I'd leave it for now, as it won't hurt.

- Dayview closed event has some logic to it, we can change some of the fields and it adjusts the others. The logic is only tied in this UI, theres no logic joining different event types.-
- It has same logic with event names being 3 instances, 2 of which always are sent.

# Results

I just created this new demo posthog
