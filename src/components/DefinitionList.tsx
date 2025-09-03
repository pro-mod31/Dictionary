interface DefinitionListProps {
  definitions: any[];
}

const DefinitionList: React.FC<DefinitionListProps> = ({ definitions }) => {
  return (
    <ul className="list-disc list-inside ml-3">
      {definitions.map((def, dIndex) => (
        <li key={dIndex} className="text-lg">
          {def.definition}
          {def.example && (
            <p className="text-sm text-gray-700 italic">Example: {def.example}</p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DefinitionList;
