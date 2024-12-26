interface UserDataProps {
  data: string;
}

export const UserData = ({ data }: UserDataProps) => {
  const parsedData = JSON.parse(data || '[]');
  
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">User Data</h2>
      {parsedData.map((item: any, index: number) => (
        <div key={index} className="mb-2">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Value:</strong> {item.value}</p>
        </div>
      ))}
    </div>
  );
}; 