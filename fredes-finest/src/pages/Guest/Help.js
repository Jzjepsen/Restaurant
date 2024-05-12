import React from 'react';

const FAQ = ({ question, answer }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
};

const HelpPage = () => {
  const faqs = [
    {
      question: 'What are your opening hours?',
      answer: 'We are open from 5 PM to 11 PM, Monday through Sunday.',
    }, 
    {
      question: 'Do you have vegan or gluten-free options?',
      answer: 'Yes! We offer a variety of vegan and gluten-free dishes. Please check our menu for more details or ask our staff for recommendations.',
    },
    {
      question: 'Can I make a reservation?',
      answer: 'Yes, you can make a reservation by calling us or using our online booking system on the website.',
    },
    {
      question: 'Do you offer delivery or takeout?',
      answer: 'We offer both delivery and takeout. You can place an order by calling us directly.',
    },
    {
      question: 'Is there parking available?',
      answer: 'Yes, we have parking available right in front of the restaurant, and additional parking on the side street.',
    },
    {
      question: 'Can I bring my own wine?',
      answer: 'Yes, we have a corkage fee for wine. Please inform our staff in advance.',
    },
    {
      question: 'What forms of payment do you accept?',
      answer: 'We accept cash and credit cards',
    },
    {
      question: 'Do you have outdoor seating?',
      answer: 'No, unfortunately we do not have outdoor seating at the moment.',
    },
    {
      question: 'Can you accommodate large groups or private events?',
      answer: 'Yes, we can arrange seating for large groups or private events. Please contact us to make arrangements.',
    },
  ];

  return (
    <div>
      <h1>Help & FAQ</h1>
      {faqs.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
      <div>
        <p>
          If you have any other questions or need further assistance, please do not hesitate to contact us at:
          <a className="tlf" href="tel:+4523305149">+45 2330 5149 </a> or mail us at:
          <a className="mail" href="fredes-finest@staff.com"> fredes-finest@staff.com</a>
          </p>
      </div>
    </div>
  );
};

export default HelpPage;
