// Usado no ambiente browser (Storybook, dev com mocks habilitados)
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
