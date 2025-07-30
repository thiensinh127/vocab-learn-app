import WordManagementPage from "./WordManagementPage";

export default function Page({ params }: { params: { id: string } }) {
  return <WordManagementPage topicId={params.id} />;
}
