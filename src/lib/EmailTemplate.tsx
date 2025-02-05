type EmailTemplateProps = {
  feedback: string;
};
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ feedback }) => {
  return (
    <div>
      <h1>The following is user feedback: {feedback}!</h1>
    </div>
  );
};
