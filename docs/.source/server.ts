// @ts-nocheck
import * as __fd_glob_2 from "../content/docs/components/btn.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/introduction.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/_meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"_meta.json": __fd_glob_0, }, {"introduction.mdx": __fd_glob_1, "components/btn.mdx": __fd_glob_2, });