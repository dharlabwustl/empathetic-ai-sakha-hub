
import React from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import { useToast } from '@/hooks/use-toast';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{conceptId: string}>();
  const { toast } = useToast();

  // Mock concept data - in a real app this would be fetched from an API
  const conceptData = {
    id: conceptId || 'default',
    title: "Understanding Cell Division",
    subject: "Biology",
    topic: "Cell Biology",
    difficulty: "medium" as const,
    content: `Cell division is the process by which a parent cell divides into two or more daughter cells. 
      Cell division usually occurs as part of a larger cell cycle. In eukaryotes, there are two distinct 
      types of cell division: mitosis and meiosis. Mitosis is for growth and repair, while meiosis is for sexual reproduction.
      
      The cell cycle consists of interphase (G₁, S, and G₂ phases) and the mitotic phase (mitosis and cytokinesis). 
      During interphase, the cell grows and DNA replication occurs. In mitosis, the replicated chromosomes are separated 
      into two nuclei, and cytokinesis divides the cytoplasm, organelles, and cell membrane.
      
      Mitosis is divided into several distinct phases: prophase, prometaphase, metaphase, anaphase, and telophase.
      In prophase, the chromosomes condense and become visible, and the nuclear envelope breaks down.
      In metaphase, the chromosomes align at the metaphase plate, an imaginary line that divides the cell in half.
      In anaphase, the sister chromatids separate and move to opposite poles of the cell.
      In telophase, nuclear envelopes form around the two sets of chromosomes, and the chromosomes begin to decondense.
      
      Cytokinesis is the process that divides the cytoplasm of the cell into two daughter cells. In animal cells,
      this occurs through a process called cleavage, where a contractile ring of actin filaments forms at the equator
      of the cell and pinches the cell in two. In plant cells, a cell plate forms at the equator and grows outward
      to create a new cell wall between the daughter cells.
      
      Understanding cell division is crucial for many areas of biology and medicine, including embryonic development,
      growth, tissue repair, and cancer research.`
  };

  // Show concept loaded toast
  React.useEffect(() => {
    toast({
      title: "Concept Loaded",
      description: `Viewing details for: ${conceptData.title}`,
      duration: 3000,
    });
  }, [conceptId, toast, conceptData.title]);

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <EnhancedConceptDetail 
        conceptId={conceptData.id}
        title={conceptData.title}
        subject={conceptData.subject}
        topic={conceptData.topic}
        difficulty={conceptData.difficulty}
        content={conceptData.content}
      />
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
