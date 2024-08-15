'use client';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import Sidebar from './Sidebar';
import { useStore } from '@/lib/store';
import { useUser } from '@clerk/nextjs';

export default function PageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { panel } = useStore();
	const { isSignedIn } = useUser();
	return (
		<ResizablePanelGroup direction='horizontal'>
			{panel && isSignedIn && (
				<>
					<ResizablePanel
						maxSize={25}
						minSize={10}
						defaultSize={20}
						id='sidebar'
						order={1}
					>
						<Sidebar />
					</ResizablePanel>
					<ResizableHandle withHandle />
				</>
			)}
			<ResizablePanel id='main-body' order={2}>
				{children}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
