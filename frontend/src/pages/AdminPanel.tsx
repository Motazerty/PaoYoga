import React, { useState, useEffect, useRef } from "react";
import { Pack, yogaPacks, beautyPacks, massagePacks, videos as defaultVideos } from "../data/packs";
import type { Stuff } from "../components/StuffCard";
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Paper, IconButton, Tooltip, Avatar, Checkbox, FormControlLabel, CircularProgress, Select, MenuItem } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { VideoLibrary, Inventory2, Widgets } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Delete, Edit, Add } from '@mui/icons-material';
import "../styles.css";

// Demo stuff data
const initialStuffList: Stuff[] = [
  {
    id: 1,
    name: "Quartz Rose",
    description: "Pierre de l'amour et de la paix.",
    price: 12,
    image: "/img/spiritual-objects/le-quartz-rose.webp",
    details: [{ label: "Origine", value: "Brésil" }],
  },
  {
    id: 2,
    name: "Bougie Méditation",
    description: "Bougie parfumée pour la relaxation.",
    price: 8,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    details: [{ label: "Parfum", value: "Lavande" }],
  },
];

const initialPack: Omit<Pack, "id"> = {
  name: "",
  price: 0,
  description: "",
  videoThumbnail: "",
  details: [],
  videoIds: [],
};
const initialStuff: Omit<Stuff, "id"> = {
  name: "",
  price: 0,
  description: "",
  image: "",
  details: [],
};

// Add Video type
interface Video {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  videoUrl: string;
}

const AdminPanel: React.FC<{ user?: { isAdmin?: boolean } }> = ({ user }) => {
  // Tab state
  const [tabIndex, setTabIndex] = useState(0);
  // Packs state
  const [packs, setPacks] = useState<Pack[]>([]);
  const [packDialogOpen, setPackDialogOpen] = useState(false);
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [packForm, setPackForm] = useState(initialPack);
  const [packDetails, setPackDetails] = useState<{ label: string; value: string }[]>([]);
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>([]);
  const [packErrors, setPackErrors] = useState<{ [key: string]: string }>({});
  const [packSearch, setPackSearch] = useState("");
  const [packSelected, setPackSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Stuff state
  const [stuffList, setStuffList] = useState<Stuff[]>([]);
  const [stuffDialogOpen, setStuffDialogOpen] = useState(false);
  const [editingStuff, setEditingStuff] = useState<Stuff | null>(null);
  const [stuffForm, setStuffForm] = useState(initialStuff);
  const [stuffDetails, setStuffDetails] = useState<{ label: string; value: string }[]>([]);
  const [stuffErrors, setStuffErrors] = useState<{ [key: string]: string }>({});
  const [stuffSearch, setStuffSearch] = useState("");
  const [stuffSelected, setStuffSelected] = useState<number[]>([]);

  // Video state
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoSearch, setVideoSearch] = useState("");
  const [videoSelected, setVideoSelected] = useState<number[]>([]);
  const [videoForm, setVideoForm] = useState<Partial<Video>>({});
  let tata = videoForm;
  tata = { ...tata, title: "New Video Title" };
  // Load from localStorage or initial data
  useEffect(() => {
    setLoading(true);
    const packsLS = localStorage.getItem("packs");
    const stuffLS = localStorage.getItem("stuffList");
    const videosLS = localStorage.getItem("videos");
    // Always use defaultVideos if localStorage is empty or corrupted
    let loadedVideos;
    try {
      loadedVideos = videosLS ? JSON.parse(videosLS) : null;
    } catch {
      loadedVideos = null;
    }
    setPacks(packsLS ? JSON.parse(packsLS) : [...yogaPacks, ...beautyPacks, ...massagePacks]);
    setStuffList(stuffLS ? JSON.parse(stuffLS) : initialStuffList);
    setVideos(Array.isArray(loadedVideos) && loadedVideos.length > 0 ? loadedVideos : defaultVideos);
    setLoading(false);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("packs", JSON.stringify(packs));
  }, [packs]);
  useEffect(() => {
    localStorage.setItem("stuffList", JSON.stringify(stuffList));
  }, [stuffList]);
  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // Validation helpers
  function validatePack(form: typeof packForm, details: typeof packDetails, videoIds: number[]) {
      const errors: { [key: string]: string } = {};
      if (!form.name) errors.name = "Name required";
      if (!form.price || form.price <= 0) errors.price = "Price must be positive";
      if (!form.description) errors.description = "Description required";
      if (!form.videoThumbnail) errors.videoThumbnail = "Thumbnail required";
      if (details.length === 0) errors.details = "At least one detail required";
      if (videoIds.length === 0) errors.videos = "At least one video required";
      return errors;
    }
  function validateStuff(form: typeof stuffForm, details: typeof stuffDetails) {
    const errors: { [key: string]: string } = {};
    if (!form.name) errors.name = "Name required";
    if (!form.price || form.price <= 0) errors.price = "Price must be positive";
    if (!form.description) errors.description = "Description required";
    if (!form.image) errors.image = "Image required";
    if (details.length === 0) errors.details = "At least one detail required";
    return errors;
  }
//   function validateVideo(form: Partial<Video>) {
//     const errors: { [key: string]: string } = {};
//     if (!form.title) errors.title = "Title required";
//     if (!form.thumbnail) errors.thumbnail = "Thumbnail required";
//     if (!form.description) errors.description = "Description required";
//     if (!form.videoUrl) errors.videoUrl = "Video URL required";
//     return errors;
//   }

  // Pack handlers
  function handleAddPack() {
  setEditingPack(null);
  setPackForm(initialPack);
  setPackDetails([]);
  setSelectedVideoIds([]);
  setPackErrors({});
  setPackDialogOpen(true);
  }
  function handleEditPack(pack: Pack) {
  setEditingPack(pack);
  setPackForm({ ...pack });
  setPackDetails(pack.details || []);
  setSelectedVideoIds(pack.videoIds || []);
  setPackErrors({});
  setPackDialogOpen(true);
  }
  function handleDeletePack(id: number) {
    setPacks(packs.filter((p) => p.id !== id));
  }
  function handleBulkDeletePacks() {
    setPacks(packs.filter((p) => !packSelected.includes(p.id)));
    setPackSelected([]);
  }
  function handlePackDialogSave() {
    const errors = validatePack(packForm, packDetails, selectedVideoIds);
    setPackErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    const newPack = { ...packForm, details: packDetails, videoIds: selectedVideoIds, id: editingPack ? editingPack.id : Date.now() } as Pack;
    if (editingPack) {
      setPacks(packs.map((p) => (p.id === editingPack.id ? newPack : p)));
    } else {
      setPacks([...packs, newPack]);
    }
    setPackDialogOpen(false);
    setLoading(false);
  }

  // Stuff handlers
  function handleAddStuff() {
    setEditingStuff(null);
    setStuffForm(initialStuff);
    setStuffDetails([]);
    setStuffErrors({});
    setStuffDialogOpen(true);
  }
  function handleEditStuff(stuff: Stuff) {
    setEditingStuff(stuff);
    setStuffForm({ ...stuff });
    setStuffDetails(stuff.details || []);
    setStuffErrors({});
    setStuffDialogOpen(true);
  }
  function handleDeleteStuff(id: number) {
    setStuffList(stuffList.filter((s) => s.id !== id));
  }
  function handleBulkDeleteStuff() {
    setStuffList(stuffList.filter((s) => !stuffSelected.includes(s.id)));
    setStuffSelected([]);
  }
  function handleStuffDialogSave() {
    const errors = validateStuff(stuffForm, stuffDetails);
    setStuffErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    const newStuff = { ...stuffForm, details: stuffDetails, id: editingStuff ? editingStuff.id : Date.now() } as Stuff;
    if (editingStuff) {
      setStuffList(stuffList.map((s) => (s.id === editingStuff.id ? newStuff : s)));
    } else {
      setStuffList([...stuffList, newStuff]);
    }
    setStuffDialogOpen(false);
    setLoading(false);
  }

  // Video handlers
  // Reset videos to defaultVideos from packs.ts
  function handleResetVideos() {
    setVideos(defaultVideos);
    localStorage.setItem("videos", JSON.stringify(defaultVideos));
  }
  function handleAddVideo() {
    setVideoForm({ title: "", thumbnail: "", description: "", videoUrl: "" });
    // Removed unused setEditingVideo, setVideoErrors, setVideoDialogOpen
  }
  function handleEditVideo(video: Video) {
    setVideoForm({ ...video });
    // Removed unused setEditingVideo, setVideoErrors, setVideoDialogOpen
  }
  function handleDeleteVideo(id: number) {
    setVideos(videos.filter((v) => v.id !== id));
  }
  function handleBulkDeleteVideos() {
    setVideos(videos.filter((v) => !videoSelected.includes(v.id)));
    setVideoSelected([]);
  }
//   function handleVideoDialogSave() {
//     const errors = validateVideo(videoForm);
//     setVideoErrors(errors);
//     if (Object.keys(errors).length > 0) return;
//     const newVideo = { ...videoForm, id: editingVideo ? editingVideo.id : Date.now() } as Video;
//     if (editingVideo) {
//       setVideos(videos.map((v) => (v.id === editingVideo.id ? newVideo : v)));
//     } else {
//       setVideos([...videos, newVideo]);
//     }
//     setVideoDialogOpen(false);
//   }

  // Handle image upload
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === "string") {
          setUploadedImages((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }
  // Handle video upload
  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === "string") {
          setUploadedVideos((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }

  // Search/filter
  const filteredPacks = packs.filter(p => p.name.toLowerCase().includes(packSearch.toLowerCase()));
  const filteredStuff = stuffList.filter(s => s.name.toLowerCase().includes(stuffSearch.toLowerCase()));
  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(videoSearch.toLowerCase()));

  // Role-based access
  if (!user?.isAdmin) {
    return <Box className="container" sx={{ p: 3 }}><Typography color="error" variant="h5">Access denied. Admins only.</Typography></Box>;
  }

  return (
    <Box className="container" sx={{ p: 3 }}>
      <Typography className="main-title" variant="h4" fontWeight={700} mb={3}>Admin Panel</Typography>
      {loading && <CircularProgress sx={{ mb: 2 }} />}
      {/* Tabs for management sections */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, background: '#f5f5f5', borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, v) => setTabIndex(v)}
          aria-label="admin management tabs"
          variant="fullWidth"
          TabIndicatorProps={{ style: { height: 4, background: '#1976d2', borderRadius: 2 } }}
        >
          <Tab icon={<VideoLibrary />} iconPosition="start" label="Video Management" />
          <Tab icon={<Inventory2 />} iconPosition="start" label="Pack Management" />
          <Tab icon={<Widgets />} iconPosition="start" label="Stuff Management" />
        </Tabs>
      </Box>
      {/* Tab Panels */}
      {tabIndex === 0 && (
  <Paper className="card" sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 3, background: '#e3f2fd' }}>
          <Typography className="subtitle" variant="h5" mb={2}>Video Management</Typography>
          <Box className="flex" sx={{ mb: 2 }}>
            <TextField label="Search Videos" value={videoSearch} onChange={e => setVideoSearch(e.target.value)} sx={{ flex: 1 }} />
            <Button className="button" variant="contained" color="primary" onClick={handleAddVideo} startIcon={<Add />}>Add New Video</Button>
            <Button className="button" color="error" disabled={videoSelected.length === 0} onClick={handleBulkDeleteVideos} startIcon={<Delete />}>Delete Selected</Button>
            <Button className="button" color="secondary" onClick={handleResetVideos} sx={{ ml: 2, transition: 'background 0.2s', '&:hover': { background: '#b3e5fc' } }}>Reset Videos</Button>
          </Box>
          {filteredVideos.length === 0 ? <Typography>No videos found.</Typography> : (
            <Grid container spacing={3}>
              {filteredVideos.map((video) => (
                <Grid key={video.id}>
                  <Paper className="card-container" tabIndex={0} sx={{ mb: 2, position: 'relative', borderRadius: 3, boxShadow: 2, transition: 'box-shadow 0.2s, background 0.2s', '&:hover': { boxShadow: 6, background: '#bbdefb' } }}>
                    <FormControlLabel control={<Checkbox checked={videoSelected.includes(video.id)} onChange={e => setVideoSelected(sel => e.target.checked ? [...sel, video.id] : sel.filter(id => id !== video.id))} />} label="" sx={{ position: 'absolute', top: 8, left: 8 }} />
                    <Avatar src={video.thumbnail} alt={video.title} sx={{ width: 56, height: 56, mt: 1, mx: 'auto' }} />
                    <Typography className="card-title" sx={{ mt: 2 }}>{video.title}</Typography>
                    <Typography className="card-desc">{video.description}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <video src={video.videoUrl} controls width={120} />
                    </Box>
                    <Box className="card-actions">
                      <Tooltip title="Edit"><IconButton onClick={() => handleEditVideo(video)}><Edit /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" onClick={() => handleDeleteVideo(video.id)}><Delete /></IconButton></Tooltip>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      )}
      {tabIndex === 1 && (
  <Paper className="card" sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 3, background: '#fce4ec' }}>
          <Typography className="subtitle" variant="h5" mb={2}>Pack Management</Typography>
          <Box className="flex" sx={{ mb: 2 }}>
            <TextField label="Search Packs" value={packSearch} onChange={e => setPackSearch(e.target.value)} sx={{ flex: 1 }} />
            <Button className="button" variant="contained" color="primary" onClick={handleAddPack} startIcon={<Add />}>Add New Pack</Button>
            <Button className="button" color="error" disabled={packSelected.length === 0} onClick={handleBulkDeletePacks} startIcon={<Delete />} sx={{ transition: 'background 0.2s', '&:hover': { background: '#ffcdd2' } }}>Delete Selected</Button>
          </Box>
          {filteredPacks.length === 0 ? <Typography>No packs found.</Typography> : (
            <Grid container spacing={3}>
              {filteredPacks.map((pack) => (
                <Grid key={pack.id}>
                  <Paper className="card-container" tabIndex={0} sx={{ mb: 2, position: 'relative', borderRadius: 3, boxShadow: 2, transition: 'box-shadow 0.2s, background 0.2s', '&:hover': { boxShadow: 6, background: '#f8bbd0' } }}>
                    <FormControlLabel control={<Checkbox checked={packSelected.includes(pack.id)} onChange={e => setPackSelected(sel => e.target.checked ? [...sel, pack.id] : sel.filter(id => id !== pack.id))} />} label="" sx={{ position: 'absolute', top: 8, left: 8 }} />
                    <Avatar src={pack.videoThumbnail} alt={pack.name} sx={{ width: 56, height: 56, mt: 1, mx: 'auto' }} />
                    <Typography className="card-title" sx={{ mt: 2 }}>{pack.name}</Typography>
                    <Typography className="card-desc">{pack.description}</Typography>
                    <Box className="card-details">
                      {pack.details.map((d, i) => (
                        <Typography key={i} variant="body2" color="textSecondary">{d.label}: {d.value}</Typography>
                      ))}
                    </Box>
                    {/* Show selected videos for this pack */}
                    {pack.videoIds && pack.videoIds.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" fontWeight={600} mb={1}>Videos:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                          {pack.videoIds.map((vidId) => {
                            const video = videos.find(v => v.id === vidId);
                            return video ? (
                              <Box key={vidId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar src={video.thumbnail} alt={video.title} sx={{ width: 32, height: 32 }} />
                                <Typography variant="body2">{video.title}</Typography>
                              </Box>
                            ) : null;
                          })}
                        </Box>
                      </Box>
                    )}
                    <Box className="card-actions">
                      <Tooltip title="Edit"><IconButton onClick={() => handleEditPack(pack)}><Edit /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" onClick={() => handleDeletePack(pack.id)}><Delete /></IconButton></Tooltip>
                    </Box>
                    <Box className="card-price">{pack.price}€</Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      )}
      {tabIndex === 2 && (
  <Paper className="card" sx={{ p: 3, borderRadius: 4, boxShadow: 3, background: '#e8f5e9' }}>
          <Typography className="subtitle" variant="h5" mb={2}>Stuff Management</Typography>
          <Box className="flex" sx={{ mb: 2 }}>
            <TextField label="Search Stuff" value={stuffSearch} onChange={e => setStuffSearch(e.target.value)} sx={{ flex: 1 }} />
            <Button className="button" variant="contained" color="primary" onClick={handleAddStuff} startIcon={<Add />}>Add New Stuff</Button>
            <Button className="button" color="error" disabled={stuffSelected.length === 0} onClick={handleBulkDeleteStuff} startIcon={<Delete />} sx={{ transition: 'background 0.2s', '&:hover': { background: '#ffcdd2' } }}>Delete Selected</Button>
          </Box>
          {filteredStuff.length === 0 ? <Typography>No stuff found.</Typography> : (
            <Grid container spacing={3}>
              {filteredStuff.map((stuff) => (
                <Grid key={stuff.id}>
                  <Paper className="card-container spiritual-card" tabIndex={0} sx={{ mb: 2, position: 'relative', borderRadius: 3, boxShadow: 2, transition: 'box-shadow 0.2s, background 0.2s', '&:hover': { boxShadow: 6, background: '#c8e6c9' } }}>
                    <FormControlLabel control={<Checkbox checked={stuffSelected.includes(stuff.id)} onChange={e => setStuffSelected(sel => e.target.checked ? [...sel, stuff.id] : sel.filter(id => id !== stuff.id))} />} label="" sx={{ position: 'absolute', top: 8, left: 8 }} />
                    <Avatar src={stuff.image} alt={stuff.name} sx={{ width: 56, height: 56, mt: 1, mx: 'auto' }} />
                    <Typography className="card-title" sx={{ mt: 2 }}>{stuff.name}</Typography>
                    <Typography className="card-desc">{stuff.description}</Typography>
                    <Box className="card-details">
                      {stuff.details?.map((d, i) => (
                        <Typography key={i} variant="body2" color="textSecondary">{d.label}: {d.value}</Typography>
                      ))}
                    </Box>
                    <Box className="card-actions">
                      <Tooltip title="Edit"><IconButton onClick={() => handleEditStuff(stuff)}><Edit /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" onClick={() => handleDeleteStuff(stuff.id)}><Delete /></IconButton></Tooltip>
                    </Box>
                    <Box className="card-price">{stuff.price}€</Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      )}
      {/* Pack Dialog */}
      <Dialog open={packDialogOpen} onClose={() => setPackDialogOpen(false)}>
        <DialogTitle>{editingPack ? "Edit Pack" : "Add New Pack"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 350 }}>
          <TextField label="Name" value={packForm.name} onChange={e => setPackForm(f => ({ ...f, name: e.target.value }))} error={!!packErrors.name} helperText={packErrors.name} />
          <TextField label="Price" type="number" value={packForm.price} onChange={e => setPackForm(f => ({ ...f, price: Number(e.target.value) }))} error={!!packErrors.price} helperText={packErrors.price} />
          <TextField label="Description" value={packForm.description} onChange={e => setPackForm(f => ({ ...f, description: e.target.value }))} error={!!packErrors.description} helperText={packErrors.description} />
          <Select value={packForm.videoThumbnail} onChange={e => setPackForm(f => ({ ...f, videoThumbnail: e.target.value }))} displayEmpty>
            <MenuItem value="">Select Thumbnail</MenuItem>
            <MenuItem value="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80">Yoga 1</MenuItem>
            <MenuItem value="https://cdn.pixabay.com/photo/2023/10/14/09/19/meditation-8314420_1280.png">Zen</MenuItem>
            <MenuItem value="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80">Flow</MenuItem>
            <MenuItem value="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80">Meditation</MenuItem>
            <MenuItem value="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80">Beauté</MenuItem>
            <MenuItem value="https://cdn.pixabay.com/photo/2017/02/05/15/04/stones-2040340_1280.jpg">Glamour</MenuItem>
            <MenuItem value="https://cdn.pixabay.com/photo/2023/07/13/16/32/woman-8125236_1280.jpg">Artistique</MenuItem>
          </Select>
          {packErrors.videoThumbnail && <Typography color="error">{packErrors.videoThumbnail}</Typography>}
          {/* Dynamic details */}
          <Typography fontWeight={600} mt={2}>Details</Typography>
          {packDetails.map((d, i) => (
            <Box key={i} className="flex">
              <TextField label="Label" value={d.label} onChange={e => setPackDetails(arr => arr.map((item, idx) => idx === i ? { ...item, label: e.target.value } : item))} sx={{ flex: 1 }} />
              <TextField label="Value" value={d.value} onChange={e => setPackDetails(arr => arr.map((item, idx) => idx === i ? { ...item, value: e.target.value } : item))} sx={{ flex: 1 }} />
              <IconButton onClick={() => setPackDetails(arr => arr.filter((_, idx) => idx !== i))}><Delete /></IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={() => setPackDetails(arr => [...arr, { label: "", value: "" }])}>Add Detail</Button>
          {packErrors.details && <Typography color="error">{packErrors.details}</Typography>}
          {/* Select videos for pack */}
          <Typography fontWeight={600} mt={2}>Select Videos for Pack</Typography>
          {videos.length === 0 ? <Typography>No videos available.</Typography> : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              {videos.map((video) => (
                <FormControlLabel
                  key={video.id}
                  control={<Checkbox checked={selectedVideoIds.includes(video.id)} onChange={e => setSelectedVideoIds(sel => e.target.checked ? [...sel, video.id] : sel.filter(id => id !== video.id))} />}
                  label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Avatar src={video.thumbnail} sx={{ width: 32, height: 32 }} />{video.title}</Box>}
                />
              ))}
            </Box>
          )}
          <Button variant="outlined" component="label" sx={{ mb: 1 }}>
            Upload Image
            <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={handleImageUpload} />
          </Button>
          {uploadedImages.length > 0 && (
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              {uploadedImages.map((img, idx) => (
                <Avatar key={idx} src={img} sx={{ width: 56, height: 56 }} />
              ))}
            </Box>
          )}
          <Button variant="outlined" component="label" sx={{ mb: 1 }}>
            Upload Video
            <input type="file" accept="video/*" hidden ref={videoInputRef} onChange={handleVideoUpload} />
          </Button>
          {uploadedVideos.length > 0 && (
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              {uploadedVideos.map((vid, idx) => (
                <video key={idx} src={vid} controls width={120} />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePackDialogSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Stuff Dialog */}
      <Dialog open={stuffDialogOpen} onClose={() => setStuffDialogOpen(false)}>
        <DialogTitle>{editingStuff ? "Edit Stuff" : "Add New Stuff"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 350 }}>
          <TextField label="Name" value={stuffForm.name} onChange={e => setStuffForm(f => ({ ...f, name: e.target.value }))} error={!!stuffErrors.name} helperText={stuffErrors.name} />
          <TextField label="Price" type="number" value={stuffForm.price} onChange={e => setStuffForm(f => ({ ...f, price: Number(e.target.value) }))} error={!!stuffErrors.price} helperText={stuffErrors.price} />
          <TextField label="Description" value={stuffForm.description} onChange={e => setStuffForm(f => ({ ...f, description: e.target.value }))} error={!!stuffErrors.description} helperText={stuffErrors.description} />
          <Select value={stuffForm.image} onChange={e => setStuffForm(f => ({ ...f, image: e.target.value }))} displayEmpty>
            <MenuItem value="">Select Image</MenuItem>
            <MenuItem value="/public/img/spiritual-objects/le-quartz-rose.webp">Quartz Rose</MenuItem>
            <MenuItem value="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80">Bougie Méditation</MenuItem>
          </Select>
          {stuffErrors.image && <Typography color="error">{stuffErrors.image}</Typography>}
          {/* Dynamic details */}
          <Typography fontWeight={600} mt={2}>Details</Typography>
          {stuffDetails.map((d, i) => (
            <Box key={i} className="flex">
              <TextField label="Label" value={d.label} onChange={e => setStuffDetails(arr => arr.map((item, idx) => idx === i ? { ...item, label: e.target.value } : item))} sx={{ flex: 1 }} />
              <TextField label="Value" value={d.value} onChange={e => setStuffDetails(arr => arr.map((item, idx) => idx === i ? { ...item, value: e.target.value } : item))} sx={{ flex: 1 }} />
              <IconButton onClick={() => setStuffDetails(arr => arr.filter((_, idx) => idx !== i))}><Delete /></IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={() => setStuffDetails(arr => [...arr, { label: "", value: "" }])}>Add Detail</Button>
          {stuffErrors.details && <Typography color="error">{stuffErrors.details}</Typography>}
          <Button variant="outlined" component="label" sx={{ mb: 1 }}>
            Upload Image
            <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={handleImageUpload} />
          </Button>
          {uploadedImages.length > 0 && (
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              {uploadedImages.map((img, idx) => (
                <Avatar key={idx} src={img} sx={{ width: 56, height: 56 }} />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStuffDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStuffDialogSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
