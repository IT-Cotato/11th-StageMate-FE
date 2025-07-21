import Link from '@tiptap/extension-link';

export const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'font-semibold underline text-blue-500',
      },
    };
  },
});
