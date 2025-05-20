import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const Index = () => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    tanggal: "wajib",
    waktu: new Date(),
  });

  const [ibadah, setIbadah] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, waktu: selectedDate });
    }
  };

  const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIbadah = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ibadah");
      const data = await response.json();
      setIbadah(data);
    } catch (error) {
      console.error("Eror gabisa menampilkan data:", error);
    }
  };

  const handleSubmit = async () => {
    if (form.name.trim() === "" || form.tanggal.trim() === "" || !form.waktu) {
      alert("Semua field harus diisi");
      return;
    }

    const formattedData = {
      name: form.name,
      tanggal: form.tanggal,
      waktu: formatDate(form.waktu),
    };

    try {
      const response = await fetch(
        form.id
          ? `http://127.0.0.1:8000/api/ibadah/${form.id}`
          : "http://127.0.0.1:8000/api/ibadah",
        {
          method: form.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(form.id ? "Data berhasil diupdate" : "Data berhasil ditambahkan");
        setForm({
          id: null,
          name: "",
          tanggal: "wajib",
          waktu: new Date(),
        });
        getIbadah();
      } else {
        alert("Gagal memproses data: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat memproses data");
    }
  };

  const handleEdit = (item: any) => {
    setForm({
      id: item.id,
      name: item.name,
      tanggal: item.tanggal,
      waktu: new Date(item.waktu.replace(/(\d{2}:\d{2})/, '$1:00')),
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ibadah/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Data berhasil dihapus");
        getIbadah();
      } else {
        alert("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Terjadi kesalahan saat menghapus data");
    }
  };

  useEffect(() => {
    getIbadah();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView>
        {/* Hero Section */}
        <View style={tw`bg-blue-800 p-8`}>
          <Text style={tw`text-4xl font-bold text-white text-center mb-2`}>
            Portal Ibadah BUMN
          </Text>
          <Text style={tw`text-white text-center text-lg`}>
            Melayani dengan Integritas, Membangun dengan Keimanan
          </Text>
        </View>

        {/* Main Content */}
        <View style={tw`p-5 max-w-4xl mx-auto`}>
          {/* Form Section */}
          <View style={tw`bg-white rounded-xl shadow-lg p-6 mb-8`}>
            <Text style={tw`text-2xl font-bold mb-6 text-blue-800 border-b pb-2`}>
              Pendaftaran Kegiatan Ibadah
            </Text>

            <View style={tw`space-y-4`}>
              <View>
                <Text style={tw`text-gray-700 font-semibold mb-2`}>Nama Kegiatan Ibadah</Text>
                <TextInput
                  style={tw`h-[50px] border border-gray-300 rounded-lg px-4 text-base bg-gray-50 focus:border-blue-500`}
                  placeholder="Masukkan nama kegiatan ibadah"
                  placeholderTextColor="#666"
                  value={form.name}
                  onChangeText={(value) => handleChange("name", value)}
                />
              </View>

              <View>
                <Text style={tw`text-gray-700 font-semibold mb-2`}>Kategori Ibadah</Text>
                <View style={tw`border border-gray-300 rounded-lg bg-gray-50`}>
                  <RNPickerSelect
                    value={form.tanggal}
                    onValueChange={(value) => handleChange("tanggal", value)}
                    items={[
                      { label: 'Wajib', value: 'wajib' },
                      { label: 'Sunah', value: 'sunah' },
                    ]}
                    style={{
                      inputIOS: tw`h-[50px] px-4`,
                      inputAndroid: tw`h-[50px] px-4`,
                    }}
                  />
                </View>
              </View>

              <View>
                <Text style={tw`text-gray-700 font-semibold mb-2`}>Waktu Pelaksanaan</Text>
                <TouchableOpacity
                  style={tw`h-[50px] border border-gray-300 rounded-lg px-4 justify-center bg-gray-50`}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={tw`text-base text-gray-700`}>
                    {formatDate(form.waktu)}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={form.waktu}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <TouchableOpacity
                style={tw`bg-blue-800 h-[50px] rounded-lg items-center justify-center shadow-md active:bg-blue-900 mt-4`}
                onPress={handleSubmit}
              >
                <Text style={tw`text-white text-base font-bold`}>
                  {form.id ? "Update Kegiatan" : "Daftarkan Kegiatan"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Data Table Section */}
          <View style={tw`bg-white rounded-xl shadow-lg p-6`}>
            <Text style={tw`text-2xl font-bold mb-6 text-blue-800 border-b pb-2`}>
              Daftar Kegiatan Ibadah
            </Text>

            <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
              <Text style={tw`text-gray-600 text-sm`}>
                Total Kegiatan: {ibadah.length} Program
              </Text>
            </View>

            {ibadah.map((item, index) => (
              <View
                key={index}
                style={tw`bg-white p-6 rounded-lg mb-4 border border-gray-200 shadow-sm`}
              >
                <View style={tw`flex-row justify-between items-center mb-3`}>
                  <Text style={tw`text-xl font-bold text-blue-800`}>{item.name}</Text>
                  <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
                    <Text style={tw`text-blue-800 font-medium`}>{item.tanggal}</Text>
                  </View>
                </View>

                <View style={tw`space-y-2 mb-4`}>
                  <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-gray-600 font-medium`}>Waktu Pelaksanaan:</Text>
                    <Text style={tw`text-gray-800 ml-2`}>{item.waktu}</Text>
                  </View>
                </View>

                <View style={tw`flex-row justify-between space-x-2`}>
                  <TouchableOpacity
                    style={tw`bg-yellow-500 px-6 py-2 rounded-lg shadow-sm active:bg-yellow-600 flex-row items-center`}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={tw`text-white font-bold`}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`bg-red-500 px-6 py-2 rounded-lg shadow-sm active:bg-red-600 flex-row items-center`}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={tw`text-white font-bold`}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={tw`mt-8 p-6 bg-gray-800 rounded-xl`}>
            <Text style={tw`text-white text-center text-sm`}>
              © 2024 Portal Ibadah BUMN. Hak Cipta Dilindungi.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;