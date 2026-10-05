import { CodeBlock } from "./CodeBlock";
import { ImageRow } from "./ImageRow";
import {
  Button,
  Card,
  Cards,
  Channel,
  Command,
  DoneWhen,
  Key,
  Step,
  Steps,
} from "./mdx";

/**
 * Everything a howto's MDX can use, for the guide pages and the README at
 * the top of /howtos. Kept apart from the components themselves so their
 * file only exports components, which Fast Refresh needs.
 */
export const HOWTO_MDX_COMPONENTS = {
  pre: CodeBlock,
  ImageRow,
  Command,
  Channel,
  Button,
  Key,
  Steps,
  Step,
  Cards,
  Card,
  DoneWhen,
};
