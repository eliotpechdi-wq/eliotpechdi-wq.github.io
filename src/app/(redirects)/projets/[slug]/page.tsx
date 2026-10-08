import { Redirect } from "@/components/Redirect";
import { projectSlugs } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function Page(props: PageProps<"/projets/[slug]">) {
  const { slug } = await props.params;
  return <Redirect to={`/fr/projets/${slug}/`} />;
}
