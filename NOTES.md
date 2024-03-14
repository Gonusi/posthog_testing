# TODO:

Ultimate goal:

- Measure the cound of instances when using dayview has:

  - total amount of dayview count
  - decreased error count
  - increased error count or left it the same

- See videos for events and actions and groups
- Determine if we can have funnel: dayviewOpen -> dayviewChange -> dayviewChange -> (any number of changes) -> dayviewClose ->

# Questions

- When we send the total number of errors during interaction with dayview, do we mean the total number of errors for that day (3 errors max - for morning, afternoon, night)?

# Problems

## Problems with making each action represent a "success" or a "failure"

### Action success / failure descripancy with reducing error count

It can often be that a fragment change will not result in full error correction, despite moving towards positive outcome. So after a drag, the efficiency score may have moved a bit towards being in range of the limits, yet not enough so to warrant a full "success", and so would be marked as "failure". But maybe we need at least 3 fragments to be moved to enter the limit range, and it's impossible to archieve using 1 framgent... Then 2 would be failures, 1 would be success (the last one). This is important to understand because the amount of errors will not be in sync with amount of failure / success actions performed (as I initially thought).

Most importantly though I think it may not be a good metric by itself - number of failures may be very large when actually they were all "correct" moves.

We could try to make an action a "success" if it reduces error - if it moves efficiency score towards the limit range. However, see point below.

### Action can be both a success and a failure

An action can remove (or reduce, see above) error in morning efficiency score, but increase it in afternoon.

For now solution is that if action:

- Reduces error count: success
- Reduces error count and increases error count equally: failure
- Increases error count: failure

## Recommendation

Only use such actions inside funnels
