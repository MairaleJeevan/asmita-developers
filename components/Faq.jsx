import Pretitle from "./Pretitle";
import FaqItem from "./FaqItem";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const faqItemsData = [
  {
    title: "How long does a construction project usually take?",
    description: "Timelines vary based on project size and complexity.",
  },
  {
    title: "Do I need permits for my project?",
    description: "Timelines vary based on project size and complexity.",
  },
  {
    title: "What materials do you use?",
    description: "Timelines vary based on project size and complexity.",
  },
  {
    title: "Can I make changes after construction starts?",
    description: "Timelines vary based on project size and complexity.",
  },
  {
    title: "How much will my construction project cost?",
    description: "Timelines vary based on project size and complexity.",
  },
  {
    title: "How do you ensure quality and safety on-site?",
    description: "Timelines vary based on project size and complexity.",
  },
];

// animation variants for FAQ items
const faqItemVariants = {
  hidden: { opacity: 0, y: 30 },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.3 }, // staggered animation
  }),
};

const Faq = () => {
  return (
    <section className="pt-16 xl:pt-32">
      <div className="container mx-auto">
        {/* text */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center max-w-[540px] mx-auto xl:mb-20"
        >
          <Pretitle text="Faq" center />
          <h2 className="h2 mb-3">Got Questions? We've Got You Covered</h2>
          <p className="mb-11 max-w-[480px] mx-auto">
            From project planning to final touches, we've answered the most
            common questions to help you make informed decisions.
          </p>
        </motion.div>
        {/* faq items */}
        <ul className="w-full flex flex-col">
          {faqItemsData.map((item, index) => {
            return (
              <motion.li
                key={index}
                variants={faqItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.8 }}
                custom={index} // pass index to control stagger effect
              >
                <FaqItem title={item.title} description={item.description} />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
