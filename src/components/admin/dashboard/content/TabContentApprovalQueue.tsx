
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit, Check, X, Eye, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Book, FileText, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

interface TabContentApprovalQueueProps {
  handleContentAction: (action: string, title: string) => void;
}

const TabContentApprovalQueue = ({ handleContentAction }: TabContentApprovalQueueProps) => {
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const contentItems = [
    { 
      type: 'concept', 
      title: 'Newton\'s Laws of Motion', 
      subject: 'Physics', 
      date: new Date(2023, 5, 12), 
      status: 'pending',
      author: 'Dr. Smith',
      description: 'Comprehensive explanation of Newton\'s three laws of motion with practical examples'
    },
    { 
      type: 'flashcard', 
      title: 'Periodic Table Elements', 
      subject: 'Chemistry', 
      date: new Date(2023, 5, 14), 
      status: 'approved',
      author: 'Prof. Johnson',
      description: 'Interactive flashcards covering all periodic table elements'
    },
    { 
      type: 'exam', 
      title: 'Practice Test: Calculus', 
      subject: 'Mathematics', 
      date: new Date(2023, 5, 15), 
      status: 'pending',
      author: 'Dr. Wilson',
      description: 'Comprehensive calculus practice test with step-by-step solutions'
    },
    { 
      type: 'concept', 
      title: 'Cellular Respiration', 
      subject: 'Biology', 
      date: new Date(2023, 5, 16), 
      status: 'rejected',
      author: 'Prof. Davis',
      description: 'Detailed explanation of cellular respiration process and its stages'
    },
  ];

  const handleViewContent = (item: any) => {
    openDialog('view', item.title, item);
  };

  const handleEditContent = (item: any) => {
    openDialog('edit', item.title, item);
  };

  const handleContentSettings = (item: any) => {
    openDialog('settings', item.title, item);
  };

  const handleApproveContent = (item: any) => {
    openDialog('approve', item.title, item);
  };

  const handleRejectContent = (item: any) => {
    openDialog('reject', item.title, item);
  };

  const handleSave = (data: any) => {
    toast({
      title: "Content Updated",
      description: `${data.title} has been updated successfully.`,
    });
    handleContentAction("Update", data.title);
  };

  const handleConfirm = () => {
    const actionType = dialogState.type === 'approve' ? 'Approved' : 'Rejected';
    toast({
      title: `Content ${actionType}`,
      description: `${dialogState.title} has been ${actionType.toLowerCase()}.`,
      variant: dialogState.type === 'approve' ? 'default' : 'destructive'
    });
    handleContentAction(actionType, dialogState.title);
  };

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-4">
          <h3 className="font-medium">Content Approval Queue</h3>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search content..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {item.type === 'concept' && <Book size={16} className="text-blue-500" />}
                        {item.type === 'flashcard' && <FileText size={16} className="text-green-500" />}
                        {item.type === 'exam' && <FileCode size={16} className="text-amber-500" />}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.date.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {item.status === 'approved' && (
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      )}
                      {item.status === 'pending' && (
                        <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                      )}
                      {item.status === 'rejected' && (
                        <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewContent(item)}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditContent(item)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleContentSettings(item)}
                        >
                          <Settings size={14} />
                        </Button>
                        {item.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-600 hover:bg-green-50"
                              onClick={() => handleApproveContent(item)}
                            >
                              <Check size={14} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleRejectContent(item)}
                            >
                              <X size={14} />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default TabContentApprovalQueue;
