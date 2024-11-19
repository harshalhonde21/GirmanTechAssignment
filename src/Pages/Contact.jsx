import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    // Automatically open email client on page load
    window.location.href = "mailto:contact@girmantech.com";
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p>If the email client did not open, click <a href="mailto:contact@girmantech.com" className="text-blue-500 underline">here</a>.</p>
    </div>
  );
};

export default Contact;
