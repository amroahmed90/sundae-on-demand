import {
  render,
  screen,
  waitFor,
} from "../../../testing-utils/testing-library-utils";
import Entry from "../Entry";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("handles error for scoops and toppings routes", async () => {
  // reset handlers and replace by erroneous handlers
  server.resetHandlers(
    rest.get("http://localhost:3035/scoops", (req, res, ctx) =>
      res(ctx.status(500)),
    ),
    rest.get("http://localhost:3035/toppings", (req, res, ctx) =>
      res(ctx.status(500)),
    ),
  );

  render(<Entry setStage={jest.fn()} />);
  // race error
  // when not using waitFor, the test only finds 1 alert - why?
  // there are 2 alerts are being rendered
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
