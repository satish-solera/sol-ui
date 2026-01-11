// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"introduction.mdx": () => import("../content/docs/introduction.mdx?collection=docs"), "components/btn.mdx": () => import("../content/docs/components/btn.mdx?collection=docs"), }),
};
export default browserCollections;