const sampleParagraph = {
  id: '1',
  text: 'This is a sample paragraph. Replace this with your actual content.',
  questions: [
    {
      id: 'q1',
      text: 'Sample Question 1?',
      options: [
        { id: 'o1', text: 'Option 1' },
        { id: 'o2', text: 'Option 2' },
        { id: 'o3', text: 'Option 3' },
      ],
      allowMultiple: false,
    },
    {
      id: 'q2',
      text: 'Sample Question 2?',
      options: [
        { id: 'o4', text: 'Option 4' },
        { id: 'o5', text: 'Option 5' },
        { id: 'o6', text: 'Option 6' },
      ],
      allowMultiple: true,
    },
  ],
};

module.exports = sampleParagraph; 