import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = 'images' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;

      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
      const url = urlData.publicUrl;
      
      setPreview(url);
      onChange(url);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Erreur lors de l\'upload. Vérifiez que vous êtes connecté en tant qu\'administrateur.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-600 mb-1">Image</label>
      
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              <span className="text-sm text-slate-500">Upload en cours...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-sm text-slate-500">Cliquez pour importer une image</span>
              <span className="text-xs text-slate-400">JPG, PNG, WEBP (max 5 Mo)</span>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {/* URL manuelle en fallback */}
      <div className="flex items-center gap-2">
        <Image className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
          placeholder="Ou collez une URL d'image..."
          className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
