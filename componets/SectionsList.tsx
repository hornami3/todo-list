import { Box, Icon, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import TaskItemsList from "./TaskItemsList";
import SectionDialog from "./SectionDialog";
import { useAppSelector } from "../hooks/reduxHelpers";
import { useState } from "react";

const SectionsList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sectionId, setSectionId] = useState("");
  const sections = useAppSelector((state) => state.tasks.sections);

  const editSectionHandler = (sectionId: string) => {
    setSectionId(sectionId);
    onOpen();
  };

  const createSectionHandler = () => {
    setSectionId("");
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6} p={6}>
        {sections.map((section) => (
          <TaskItemsList
            key={section.id}
            id={section.id}
            title={section.title}
            taskItems={section.tasks}
            onEditSection={editSectionHandler}
          />
        ))}

        <Box
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={4}
          bg="gray.300"
          p={4}
          borderRadius={4}
          boxShadow="md"
          maxW="sm"
          width="100%"
          height="max-content"
          _hover={{
            opacity: 0.8,
          }}
          onClick={createSectionHandler}
        >
          <Icon as={MdAdd} />
          <Text>Add A Section</Text>
        </Box>
      </SimpleGrid>
      <SectionDialog isOpen={isOpen} onClose={onClose} sectionId={sectionId} />
    </>
  );
};

export default SectionsList;
