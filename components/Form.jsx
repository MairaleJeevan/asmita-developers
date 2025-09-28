// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import Button from "./Button";

// const Form = () => {
//   return (
//     <form className="flex flex-col">
//       <div className="flex flex-col gap-[20px] mb-[20px]">
//         <Input type="fullname" placeholder="Full Name" />
//         <Input type="email" placeholder="Email address" />
//         <div className="flex flex-col xl:flex-row gap-[20px]">
//           <Input type="phone" placeholder="Phone number" />
//           <Select>
//             <SelectTrigger className="w-full rounded-none h-[54px] text-secondary outline-none">
//               <SelectValue placeholder="Select a service"></SelectValue>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Select a service</SelectLabel>
//                 <SelectItem value="construction">Construction</SelectItem>
//                 <SelectItem value="renovation">Renovation</SelectItem>
//                 <SelectItem value="restoration">Restoration</SelectItem>
//                 <SelectItem value="consulting">Consulting</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <div className="flex flex-col gap-6">
//         {/* textarea */}
//         <Textarea
//           className="h-[180px] resize-none rounded-none"
//           placeholder="Enter your message"
//         />
//         {/* btn */}
//         <Button text="Send message">Send message</Button>
//       </div>
//     </form>
//   );
// };

// export default Form;




import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Button from "./Button";

const Form = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Replace these with your actual EmailJS credentials
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add current date to form data
    const currentDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create hidden input for date
    const dateInput = document.createElement('input');
    dateInput.type = 'hidden';
    dateInput.name = 'date';
    dateInput.value = currentDate;
    form.current.appendChild(dateInput);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log('Email sent successfully!', result.text);
        setIsSent(true);
        form.current.reset();
        
        // Remove the temporary date input
        form.current.removeChild(dateInput);
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
        alert('Sorry, there was an error sending your message. Please try again.');
        // Remove the temporary date input even on error
        form.current.removeChild(dateInput);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full">
      {isSent && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>✅ Thank you! Your message has been sent successfully.</p>
        </div>
      )}
      
      <form ref={form} onSubmit={sendEmail} className="flex flex-col">
        <div className="flex flex-col gap-[20px] mb-[20px]">
          <Input 
            name="from_name" 
            type="text" 
            placeholder="Full Name" 
            required 
            disabled={isLoading}
          />
          <Input 
            name="from_email" 
            type="email" 
            placeholder="Email address" 
            required 
            disabled={isLoading}
          />
          <div className="flex flex-col xl:flex-row gap-[20px]">
            <Input 
              name="phone" 
              type="tel" 
              placeholder="Phone number" 
              disabled={isLoading}
            />
            <Select name="service" disabled={isLoading}>
              <SelectTrigger className="w-full rounded-none h-[54px] text-secondary outline-none">
                <SelectValue placeholder="Select a service"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a service</SelectLabel>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="restoration">Restoration</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Textarea
            name="message"
            className="h-[180px] resize-none rounded-none"
            placeholder="Enter your message"
            required
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isLoading ? "Sending..." : "Send message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
