type TextNode = {
  type: "text";
  text: string;
};

type ParagraphNode = {
  type: "paragraph";
  children: TextNode[];
};
