import { source } from "@/lib/source";
import type { Metadata } from "next";
import { DocsPage, DocsBody } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";



export default async function Page(props:PageProps<'/docs/[[...slug]]'>) {

  const params = await props.params;
  const page = source.getPage(params.slug);
  if(!page) notFound();

  const MDX = page.data.body;

  return(
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>
        <MDX  
        components={getMDXComponents({
          a: createRelativeLink(source , page)
        })}
        
        />
      </DocsBody>

    </DocsPage>
  )
  
}
