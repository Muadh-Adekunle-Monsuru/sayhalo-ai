import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export default function Markdown({ value }: { value: string }) {
	return <SimpleMDE value={value} />;
}
