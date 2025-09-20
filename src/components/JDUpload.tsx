// import React, { useState, useCallback } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import { Upload, File, X, Eye, Plus, Search, Filter } from 'lucide-react';
// import mammoth from 'mammoth';

// interface UploadedFile {
//   id: string;
//   name: string;
//   size: number;
//   type: string;
//   uploadDate: Date;
//   file: File;
// }

// const JDUpload = () => {
//   const [files, setFiles] = useState<UploadedFile[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [extractedInfo, setExtractedInfo] = useState<any>(null);
//   const { toast } = useToast();

//   const validateFile = (file: File): boolean => {
//     const allowedTypes = [
//       'application/pdf',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'text/plain'
//     ];
//     const maxSize = 10 * 1024 * 1024; // 10MB

//     if (!allowedTypes.includes(file.type)) {
//       toast({
//         title: "Invalid file type",
//         description: "Please upload PDF, DOCX, or TXT files only.",
//         variant: "destructive",
//       });
//       return false;
//     }

//     if (file.size > maxSize) {
//       toast({
//         title: "File too large",
//         description: "Please upload files smaller than 10MB.",
//         variant: "destructive",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       if (validateFile(file)) {
//         const uploadedFile: UploadedFile = {
//           id: Math.random().toString(36).substr(2, 9),
//           name: file.name,
//           size: file.size,
//           type: file.type,
//           uploadDate: new Date(),
//           file: file
//         };
//         setFiles([uploadedFile]);
//         setSelectedFile(file);
//         setExtractedInfo(null);
//       }
//     }
//   };

//   const handleExtract = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append('cv_file', selectedFile);

//     try {
//       const response = await fetch('http://127.0.0.1:5000/extract', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to extract information');
//       }

//       const data = await response.json();
//       setExtractedInfo(data);
//       toast({
//         title: "Extraction Successful",
//         description: "Information was successfully extracted from your CV.",
//         variant: "default",
//       });

//       const formattedResume = data.formatted_resume;
//       const displayElement = document.getElementById('resume-display');
//       if (displayElement) {
//         displayElement.style.whiteSpace = 'pre-line';
//         displayElement.style.textAlign = 'left';
//         displayElement.style.lineHeight = '1.5';
//         displayElement.style.fontFamily = 'Arial, sans-serif';
//         displayElement.innerHTML = formattedResume;
//       }
//     } catch (error) {
//       console.error('Error extracting CV info:', error);
//       toast({
//         title: "Extraction Failed",
//         description: "An error occurred while extracting information.",
//         variant: "destructive",
//       });
//     }
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-background">
//       <div className="container mx-auto px-6 py-12">
//         <h1 className="text-5xl font-bold text-foreground mb-6">Job Description Upload System</h1>
//         <Card className="bg-gradient-card border-border/50 shadow-glow backdrop-blur-sm">
//           <CardContent>
//             <div className="flex flex-col md:flex-row gap-4">
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx,.txt"
//                 onChange={handleFileChange}
//                 className="flex-1 p-4 rounded-lg border border-border/50 bg-muted focus:ring-2 focus:ring-primary focus:outline-none transition-all"
//               />
//               <Button
//                 onClick={handleExtract}
//                 disabled={!selectedFile}
//                 className="whitespace-nowrap"
//               >
//                 Extract
//               </Button>
//             </div>
//             {files.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="font-semibold">Uploaded File:</h3>
//                 <div>
//                   {files.map((file) => (
//                     <div key={file.id}>
//                       {file.name} ({formatFileSize(file.size)})
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {extractedInfo && (
//               <div className="mt-6">
//                 <h3 className="font-semibold">Extracted Information:</h3>
//                 <pre className="bg-muted/30 p-4 rounded-lg text-sm text-foreground overflow-auto max-h-[60vh]">
//                   {JSON.stringify(extractedInfo, null, 2)}
//                 </pre>
//               </div>
//             )}
//             <div id="resume-display" className="mt-6 p-4 rounded-lg bg-muted/30"></div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default JDUpload;



import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, File, X, Eye, CheckCircle, AlertCircle, Search, Filter, Plus } from 'lucide-react';
import mammoth from 'mammoth';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  file: File;
}

const fileCategories = [
  { name: "All Files", count: 0 },
  { name: "PDF", count: 0 },
  { name: "DOCX", count: 0 },
  { name: "TXT", count: 0 }
];

const dummyExtractedInfo = {
  "Full Name": "Pranav Sharma",
  "Contact Information": {
    "Email": "pranav.sharma@email.com",
    "Phone Number": "+91-9876543210"
  },
  "Education": [
    {
      "Degree": "B.Tech in Computer Science",
      "Institution": "IIT Bombay",
      "Year": "2025",
      "Grade/Percentage": "8.7 CGPA"
    }
  ],
  "Projects": [
    {
      "Title": "Resume Parser",
      "Description": "Built a resume parser using Python and NLP techniques."
    },
    {
      "Title": "Job Portal",
      "Description": "Developed a job portal web app using React and Node.js."
    }
  ],
  "Internships/Work Experience": [
    {
      "Role": "Software Intern",
      "Company": "Google",
      "Period": "May 2024 - July 2024",
      "Description": "Worked on backend APIs for Google Maps."
    }
  ],
  "Technical Skills": [
    "Python", "React", "Node.js", "Machine Learning"
  ]
};

const JDUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Files");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, DOCX, or TXT files only.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFiles = useCallback(async (fileList: FileList) => {
    const validFiles: File[] = [];

    Array.from(fileList).forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length === 0) return;

    setUploading(true);

    // Simulate upload process
    for (const file of validFiles) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        file: file
      };

      setFiles(prev => [...prev, uploadedFile]);

      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`,
      });
    }

    setUploading(false);
  }, [toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    if (previewFile?.id === id) {
      setPreviewFile(null);
      setPreviewContent(null);
      if (previewBlobUrl) {
        URL.revokeObjectURL(previewBlobUrl);
        setPreviewBlobUrl(null);
      }
    }
  };

  const handlePreviewFile = async (file: UploadedFile) => {
    setPreviewFile(file);
    setPreviewContent(null);

    // Clean up previous blob URL
    if (previewBlobUrl) {
      URL.revokeObjectURL(previewBlobUrl);
      setPreviewBlobUrl(null);
    }

    // Read file content for preview
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewContent(e.target?.result as string);
      };
      reader.readAsText(file.file);
    } else if (file.type === 'application/pdf') {
      // Create blob URL for PDF
      const blobUrl = URL.createObjectURL(file.file);
      setPreviewBlobUrl(blobUrl);
      setPreviewContent('pdf-ready');
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const arrayBuffer = await file.file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setPreviewContent(result.value);
      } catch (error) {
        console.error('Error reading Word document:', error);
        setPreviewContent('Error: Could not read Word document content.');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeColor = (type: string): string => {
    switch (type) {
      case 'application/pdf':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'text/plain':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getFileTypeLabel = (type: string): string => {
    switch (type) {
      case 'application/pdf':
        return 'PDF';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'DOCX';
      case 'text/plain':
        return 'TXT';
      default:
        return 'FILE';
    }
  };

  // Update category counts
  const updatedCategories = fileCategories.map(cat => ({
    ...cat,
    count: cat.name === "All Files" ? files.length :
           cat.name === "PDF" ? files.filter(f => f.type === 'application/pdf').length :
           cat.name === "DOCX" ? files.filter(f => f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document').length :
           cat.name === "TXT" ? files.filter(f => f.type === 'text/plain').length : 0
  }));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setExtractedInfo(null); // Reset extracted info on new file
    }
  };

  // Dummy extract handler
  const handleExtract = () => {
    setExtractedInfo(dummyExtractedInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Professional Job Description
              <br />
              <span className="text-primary">Upload System</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Upload, manage, and preview your job descriptions efficiently. 
              Supports{" "}
              <span className="text-primary font-medium">PDF</span>,{" "}
              <span className="text-primary font-medium">DOCX</span>, and{" "}
              <span className="text-primary font-medium">TXT</span> formats.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 lg:w-80 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Upload Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Files</span>
                <Badge variant="secondary">{files.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Size</span>
                <Badge variant="secondary">
                  {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={uploading ? "destructive" : "default"} className="bg-primary">
                  {uploading ? "Uploading..." : "Ready"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="bg-gradient-card border-border/50 shadow-glow backdrop-blur-sm mb-8 hover-scale">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Upload className="w-6 h-6 text-primary" />
              Upload Job Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">
                  Drop your files here or click to browse
                </h3>
                <p className="text-muted-foreground">
                  Supports PDF, DOCX, and TXT files up to 10MB each
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <Button
                size="lg"
                className="mt-6 bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={uploading}
              >
                {uploading ? 'Processing...' : 'Choose Files'}
              </Button>
            </div>

            {uploading && (
              <div className="mt-6 flex items-center justify-center space-x-3 text-primary animate-fade-in">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <span className="text-lg">Processing upload...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Categories */}
        {files.length > 0 && (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-muted-foreground font-mono text-sm">// File Types</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {updatedCategories.map((category) => (
                  <Badge
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "secondary"}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-70">{category.count}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                  <Plus className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm">
                  Sort by Date
                </Button>
                <Button variant="outline" size="sm">
                  Sort by Size
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="w-4 h-4" />
                Search Files
              </Button>
            </div>

            {/* Files Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <Card key={file.id} className="group bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden hover-scale">
                  <CardContent className="p-0">
                    {/* File Preview Area */}
                    <div className="aspect-[4/3] bg-muted/20 border-b border-border/50 relative overflow-hidden">
                      <div className="absolute inset-4 bg-background/10 rounded-lg border border-border/30 flex items-center justify-center">
                        <File className="w-16 h-16 text-primary/60" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className={getFileTypeColor(file.type)}>
                          {getFileTypeLabel(file.type)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* File Info */}
                    <div className="p-6">
                      <div className="text-xs text-muted-foreground mb-2 font-mono">
                        {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString()}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors truncate">
                        {file.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewFile(file)}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* File Preview Modal */}
        {previewFile && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <Card className="bg-gradient-card border-border/50 shadow-glow backdrop-blur-sm w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>File Preview</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <File className="w-12 h-12 text-primary" />
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{previewFile.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className={getFileTypeColor(previewFile.type)}>
                          {getFileTypeLabel(previewFile.type)}
                        </Badge>
                        <span>{formatFileSize(previewFile.size)}</span>
                        <span>Uploaded: {previewFile.uploadDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/50 overflow-hidden h-[60vh]">
                    {previewContent ? (
                      <div className="overflow-auto h-full">
                        {previewFile.type === 'text/plain' && (
                          <pre className="p-4 text-sm font-mono whitespace-pre-wrap bg-muted/30 text-foreground h-full">
                            {previewContent}
                          </pre>
                        )}
                        {previewFile.type === 'application/pdf' && previewBlobUrl && (
                          <iframe
                            src={previewBlobUrl}
                            className="w-full h-full border-0"
                            title="PDF Preview"
                          />
                        )}
                        {previewFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                          <pre className="p-4 text-sm whitespace-pre-wrap bg-muted/30 text-foreground h-full">
                            {previewContent}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <span className="text-muted-foreground">Loading preview...</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* File Extraction Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Extract Information from CV
          </h2>
          <Card className="bg-gradient-card border-border/50 shadow-glow backdrop-blur-sm">
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="flex-1 p-4 rounded-lg border border-border/50 bg-muted focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                />
                <Button
                  onClick={handleExtract}
                  disabled={!selectedFile}
                  className="whitespace-nowrap"
                >
                  Extract
                </Button>
              </div>
              
              {extractedInfo && (
                <div className="mt-6 space-y-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Extracted Information:
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-6 space-y-4 text-foreground">
                    {/* Full Name */}
                    {extractedInfo["Full Name"] && (
                      <div>
                        <span className="font-bold">Full Name:</span> {extractedInfo["Full Name"]}
                      </div>
                    )}

                    {/* Contact Information */}
                    {extractedInfo["Contact Information"] && typeof extractedInfo["Contact Information"] === "object" && (
                      <div>
                        <span className="font-bold">Contact Information:</span>
                        <ul className="ml-4">
                          {extractedInfo["Contact Information"].Email && (
                            <li>Email: {extractedInfo["Contact Information"].Email}</li>
                          )}
                          {extractedInfo["Contact Information"]["Phone Number"] && (
                            <li>Phone: {extractedInfo["Contact Information"]["Phone Number"]}</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Education */}
                    {Array.isArray(extractedInfo.Education) && (
                      <div>
                        <span className="font-bold">Education:</span>
                        <ul className="ml-4 list-disc">
                          {extractedInfo.Education.map((edu: any, idx: number) => (
                            <li key={idx}>
                              <div>
                                <span className="font-semibold">{edu.Degree}</span> at {edu.Institution}
                                {edu["Grade/Percentage"] && <> | Grade: {edu["Grade/Percentage"]}</>}
                                {edu.Year && <> | Year: {edu.Year}</>}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Internships/Work Experience */}
                    {Array.isArray(extractedInfo["Internships/Work Experience"]) && (
                      <div>
                        <span className="font-bold">Internships/Work Experience:</span>
                        <ul className="ml-4 list-disc">
                          {extractedInfo["Internships/Work Experience"].map((exp: any, idx: number) => (
                            <li key={idx}>
                              <div>
                                <span className="font-semibold">{exp.Role}</span> at {exp.Company}
                                {exp.Period && <> | Period: {exp.Period}</>}
                                {exp.Description && (
                                  <div className="text-sm text-muted-foreground">Description: {exp.Description}</div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Projects */}
                    {Array.isArray(extractedInfo.Projects) && (
                      <div>
                        <span className="font-bold">Projects:</span>
                        <ul className="ml-4 list-disc">
                          {extractedInfo.Projects.map((proj: any, idx: number) => (
                            <li key={idx}>
                              <div>
                                <span className="font-semibold">{proj.Title}</span>
                                {proj.Description && (
                                  <div className="text-sm text-muted-foreground">Description: {proj.Description}</div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technical Skills */}
                    {extractedInfo["Technical Skills"] && (
                      <div>
                        <span className="font-bold">Technical Skills:</span>{" "}
                        {Array.isArray(extractedInfo["Technical Skills"])
                          ? extractedInfo["Technical Skills"].join(", ")
                          : extractedInfo["Technical Skills"]}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JDUpload;