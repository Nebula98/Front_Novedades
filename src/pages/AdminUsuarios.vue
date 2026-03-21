<template>
  <AdminLayout>

    <!-- ── Header ── -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-[22px] font-bold text-slate-800 tracking-tight">Directorio Académico</h1>
        <p class="text-sm text-slate-400 mt-1">Administra las cuentas de estudiantes, docentes y personal administrativo.</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="exportar"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar
        </button>
        <button
          @click="abrirModal()"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-200 transition-all hover:-translate-y-px active:translate-y-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/>
            <line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
          Nuevo Usuario
        </button>
      </div>
    </div>

    <!-- ── Stats ── -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-[12.5px] font-semibold text-slate-500 mb-2">Total Usuarios</p>
          <div v-if="loadingStats" class="h-9 w-20 bg-slate-100 rounded-xl animate-pulse mb-1.5" />
          <p v-else class="text-[36px] font-bold text-slate-900 tracking-tight leading-none mb-1.5">
            {{ stats?.totalUsuarios?.toLocaleString('es-CO') ?? '2,840' }}
          </p>
          <p class="text-[12px] text-slate-400">
            +{{ stats?.crecimientoSemestre ?? 12 }}% desde el último semestre
          </p>
        </div>
        <div class="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-[12.5px] font-semibold text-slate-500 mb-2">Usuarios Activos</p>
          <div v-if="loadingStats" class="h-9 w-20 bg-slate-100 rounded-xl animate-pulse mb-1.5" />
          <p v-else class="text-[36px] font-bold text-slate-900 tracking-tight leading-none mb-1.5">
            {{ stats?.usuariosActivos?.toLocaleString('es-CO') ?? '2,150' }}
          </p>
          <p class="text-[12px] text-slate-400">
            {{ stats?.porcentajeActivos ?? 85 }}% de la población total
          </p>
        </div>
        <div class="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <polyline points="16 11 18 13 22 9"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- ── Tabla de usuarios ── -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      <!-- Filtros -->
      <div class="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <!-- Buscador -->
        <div class="relative flex-1">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
            @input="onFilterChange"
          />
        </div>

        <!-- Filtro rol -->
        <div class="relative">
          <select
            v-model="filterRol"
            @change="onFilterChange"
            class="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <option value="">Todos los Roles</option>
            <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        <!-- Filtro programa -->
        <div class="relative">
          <select
            v-model="filterPrograma"
            @change="onFilterChange"
            class="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <option value="">Todos los Programas</option>
            <option v-for="p in PROGRAMAS" :key="p" :value="p">{{ p }}</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        <!-- Filtro avanzado -->
        <button class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
      </div>

      <!-- Tabla -->
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-100">
            <th class="text-left px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Usuario</th>
            <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 w-[120px]">Rol</th>
            <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Programa Académico</th>
            <th class="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 w-[110px]">Estado</th>
            <th class="text-right px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 w-[110px]">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <!-- Skeleton -->
          <template v-if="loadingTabla">
            <tr v-for="i in PER_PAGE" :key="i" class="border-b border-slate-50">
              <td class="px-6 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-slate-100 animate-pulse shrink-0" />
                  <div class="space-y-1.5">
                    <div class="h-3.5 w-32 bg-slate-100 rounded animate-pulse" />
                    <div class="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              </td>
              <td class="px-4 py-3.5"><div class="h-6 w-20 bg-slate-100 rounded-full animate-pulse" /></td>
              <td class="px-4 py-3.5"><div class="h-4 w-32 bg-slate-100 rounded animate-pulse" /></td>
              <td class="px-4 py-3.5"><div class="h-4 w-16 bg-slate-100 rounded animate-pulse" /></td>
              <td class="px-6 py-3.5"><div class="h-4 w-16 bg-slate-100 rounded animate-pulse ml-auto" /></td>
            </tr>
          </template>

          <!-- Datos -->
          <template v-else>
            <tr
              v-for="u in usuarios"
              :key="u.id"
              class="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group"
            >
              <!-- Usuario -->
              <td class="px-6 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="relative shrink-0">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                      <img v-if="u.avatarUrl" :src="u.avatarUrl" class="w-full h-full object-cover" alt="" />
                      <span v-else>{{ u.nombre.charAt(0) }}</span>
                    </div>
                    <!-- Dot de estado -->
                    <span
                      :class="[
                        'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white',
                        u.estado === 'Activo' ? 'bg-green-500' : u.estado === 'Pendiente' ? 'bg-amber-400' : 'bg-slate-300'
                      ]"
                    />
                  </div>
                  <div>
                    <p class="text-[13px] font-semibold text-slate-800 leading-tight">{{ u.nombre }}</p>
                    <p class="text-[11.5px] text-slate-400">{{ u.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Rol chip -->
              <td class="px-4 py-3.5">
                <span :class="['inline-block px-2.5 py-1 rounded-full text-[11.5px] font-semibold', rolChip(u.rol)]">
                  {{ u.rol }}
                </span>
              </td>

              <!-- Programa -->
              <td class="px-4 py-3.5">
                <p class="text-[13px] text-slate-600 truncate max-w-[200px]">{{ u.programa }}</p>
              </td>

              <!-- Estado -->
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-1.5">
                  <span
                    v-if="u.estado === 'Inactivo'"
                    class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"
                  />
                  <span :class="['text-[13px] font-medium', estadoColor(u.estado)]">
                    {{ u.estado }}
                  </span>
                </div>
              </td>

              <!-- Acciones -->
              <td class="px-6 py-3.5">
                <div class="flex items-center justify-end gap-0.5">
                  <!-- Editar -->
                  <button
                    @click="abrirModal(u)"
                    title="Editar usuario"
                    class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <!-- Eliminar -->
                  <button
                    @click="confirmarEliminar(u)"
                    title="Eliminar usuario"
                    class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                  <!-- Más opciones -->
                  <button
                    title="Más opciones"
                    class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- Footer tabla -->
      <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <p class="text-[12.5px] text-slate-400">
          Mostrando <span class="font-semibold text-slate-600">{{ rangoLabel }}</span> de
          <span class="font-semibold text-slate-600">{{ total.toLocaleString('es-CO') }}</span> usuarios
        </p>

        <div class="flex items-center gap-1">
          <button
            @click="page--"
            :disabled="page === 1"
            class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12.5px] font-medium text-slate-500 border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            Anterior
          </button>

          <template v-for="p in pageButtons" :key="p">
            <span v-if="p === '...'" class="px-1.5 text-slate-400 text-sm select-none">...</span>
            <button
              v-else
              @click="page = Number(p)"
              :class="[
                'w-8 h-8 rounded-lg text-[13px] font-semibold transition-all',
                page === Number(p)
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-slate-500 hover:bg-slate-100'
              ]"
            >{{ p }}</button>
          </template>

          <button
            @click="page++"
            :disabled="page === totalPages"
            class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12.5px] font-medium text-slate-500 border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-all"
          >
            Siguiente
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!-- Modal: Crear / Editar usuario                      -->
    <!-- ══════════════════════════════════════════════════ -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalAbierto"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-start p-6"
        @click.self="cerrarModal"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
        >
          <div
            v-if="modalAbierto"
            class="bg-white rounded-2xl shadow-2xl w-[360px] overflow-hidden"
          >
            <!-- Modal header -->
            <div class="flex items-start justify-between px-6 pt-6 pb-4">
              <div>
                <h3 class="text-[16px] font-bold text-slate-800">
                  {{ usuarioEditando ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}
                </h3>
                <p class="text-[12.5px] text-slate-400 mt-1 leading-relaxed">
                  {{ usuarioEditando ? 'Modifica los datos del integrante.' : 'Completa los datos para registrar un nuevo integrante en la plataforma AcademiaFlow.' }}
                </p>
              </div>
              <button @click="cerrarModal" class="text-slate-400 hover:text-slate-600 transition-colors mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <!-- Modal body -->
            <div class="px-6 pb-6 space-y-4">

              <!-- Nombre -->
              <div>
                <label class="flex items-center justify-end text-[12.5px] font-semibold text-slate-600 mb-1.5">
                  <span class="mr-auto">Nombre</span>
                </label>
                <div class="flex items-center gap-3">
                  <span class="text-[12.5px] text-slate-500 w-[72px] text-right shrink-0">Nombre</span>
                  <BaseInput v-model="form.nombre" placeholder="Ej: Juan Pérez" :error-message="errForm.nombre" />
                </div>
              </div>

              <!-- Campos del formulario en layout label-input -->
              <div class="space-y-3.5">
                <div class="flex items-start gap-3">
                  <span class="text-[12.5px] font-medium text-slate-500 w-[72px] text-right pt-2.5 shrink-0">Nombre</span>
                  <div class="flex-1">
                    <BaseInput v-model="form.nombre" placeholder="Ej: Juan Pérez" :error-message="errForm.nombre" />
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[12.5px] font-medium text-slate-500 w-[72px] text-right pt-2.5 shrink-0">Correo</span>
                  <div class="flex-1">
                    <BaseInput v-model="form.email" placeholder="usuario@u.edu.co" :error-message="errForm.email" />
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[12.5px] font-medium text-slate-500 w-[72px] text-right pt-2.5 shrink-0">Rol</span>
                  <div class="flex-1 relative">
                    <select
                      v-model="form.rol"
                      :class="[
                        'w-full appearance-none px-3 py-2.5 rounded-lg border text-sm text-slate-700 bg-white',
                        'outline-none transition-all cursor-pointer pr-8',
                        errForm.rol
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                      ]"
                    >
                      <option value="">Estudiante</option>
                      <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
                    </select>
                    <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    <p v-if="errForm.rol" class="text-[11px] text-red-500 mt-1">{{ errForm.rol }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[12.5px] font-medium text-slate-500 w-[72px] text-right pt-2.5 shrink-0">Programa</span>
                  <div class="flex-1 relative">
                    <select
                      v-model="form.programa"
                      :class="[
                        'w-full appearance-none px-3 py-2.5 rounded-lg border text-sm text-slate-700 bg-white',
                        'outline-none transition-all cursor-pointer pr-8',
                        errForm.programa
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                      ]"
                    >
                      <option value="">Seleccionar facultad/programa</option>
                      <option v-for="p in PROGRAMAS" :key="p" :value="p">{{ p }}</option>
                    </select>
                    <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    <p v-if="errForm.programa" class="text-[11px] text-red-500 mt-1">{{ errForm.programa }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[12.5px] font-medium text-slate-500 w-[72px] text-right pt-2.5 shrink-0">ID Institucional</span>
                  <div class="flex-1">
                    <BaseInput v-model="form.idInstitucional" placeholder="Código numérico" :error-message="errForm.idInstitucional" />
                  </div>
                </div>
              </div>

              <!-- Botones -->
              <div class="flex items-center gap-2.5 pt-2">
                <button
                  @click="cerrarModal"
                  class="flex-1 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  @click="guardarUsuario"
                  :disabled="guardando"
                  class="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-[13px] font-bold transition-all flex items-center justify-center gap-2"
                >
                  <svg v-if="guardando" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  {{ guardando ? 'Guardando...' : 'Guardar Usuario' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toast"
        :class="[
          'fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white z-[60]',
          toast.tipo === 'exito' ? 'bg-green-600' : 'bg-red-600'
        ]"
      >
        <svg v-if="toast.tipo === 'exito'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        {{ toast.mensaje }}
      </div>
    </Transition>

  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue'
import usuariosService from '../services/usuariosService'
import type { UsuarioAdmin, UsuariosStats, RolUsuario, EstadoUsuario } from '../types'
import AdminLayout from '../components/layout/AdminLayout.vue'
import BaseInput from '../components/ui/BaseInput.vue'

// ─── Constantes ──────────────────────────────────────────────────────────────
const PER_PAGE = 5

const ROLES: RolUsuario[] = ['Estudiante', 'Secretaria', 'Docente', 'Administrador']

const PROGRAMAS = [
  'Ingeniería de Sistemas',
  'Ingeniería Civil',
  'Derecho',
  'Medicina',
  'Administración de Empresas',
  'Psicología',
  'Arquitectura',
  'Administración Central',
]

// ─── Estado ──────────────────────────────────────────────────────────────────
const stats          = ref<UsuariosStats | null>(null)
const usuarios       = ref<UsuarioAdmin[]>([])
const total          = ref(0)
const page           = ref(1)
const search         = ref('')
const filterRol      = ref<RolUsuario | ''>('')
const filterPrograma = ref('')
const loadingStats   = ref(false)
const loadingTabla   = ref(false)

// ─── Modal ───────────────────────────────────────────────────────────────────
const modalAbierto    = ref(false)
const usuarioEditando = ref<UsuarioAdmin | null>(null)
const guardando       = ref(false)

const form = reactive({
  nombre:          '',
  email:           '',
  rol:             '' as RolUsuario | '',
  programa:        '',
  idInstitucional: '',
})

const errForm = reactive({
  nombre: '', email: '', rol: '', programa: '', idInstitucional: '',
})

// ─── Toast ───────────────────────────────────────────────────────────────────
const toast = ref<{ tipo: 'exito' | 'error'; mensaje: string } | null>(null)

// ─── Carga inicial ────────────────────────────────────────────────────────────
onMounted(async () => {
  loadingStats.value = true
  loadingTabla.value = true
  try {
    const [statsData, tablaData] = await Promise.all([
      usuariosService.getStats().catch(() => null),
      usuariosService.getUsuarios({ page: 1, limit: PER_PAGE }),
    ])
    stats.value    = statsData
    usuarios.value = tablaData.data
    total.value    = tablaData.total
  } catch { /* sin backend — valores fallback visibles en template */ } finally {
    loadingStats.value = false
    loadingTabla.value = false
  }
})

watch(page, fetchTabla)

async function fetchTabla() {
  loadingTabla.value = true
  try {
    const res = await usuariosService.getUsuarios({
      page:     page.value,
      limit:    PER_PAGE,
      search:   search.value    || undefined,
      rol:      filterRol.value || undefined,
      programa: filterPrograma.value || undefined,
    })
    usuarios.value = res.data
    total.value    = res.total
  } catch { } finally {
    loadingTabla.value = false
  }
}

function onFilterChange() { page.value = 1; fetchTabla() }

// ─── Modal ───────────────────────────────────────────────────────────────────
function abrirModal(usuario?: UsuarioAdmin) {
  usuarioEditando.value = usuario ?? null
  if (usuario) {
    form.nombre = usuario.nombre
    form.email  = usuario.email
    form.rol    = usuario.rol
    form.programa = usuario.programa
    form.idInstitucional = usuario.idInstitucional ?? ''
  } else {
    form.nombre = ''; form.email = ''; form.rol = ''
    form.programa = ''; form.idInstitucional = ''
  }
  Object.assign(errForm, { nombre: '', email: '', rol: '', programa: '', idInstitucional: '' })
  modalAbierto.value = true
}

function cerrarModal() { modalAbierto.value = false }

function validarForm(): boolean {
  Object.assign(errForm, { nombre: '', email: '', rol: '', programa: '', idInstitucional: '' })
  let ok = true
  if (!form.nombre.trim())          { errForm.nombre = 'El nombre es requerido.'; ok = false }
  if (!form.email.trim())           { errForm.email  = 'El correo es requerido.'; ok = false }
  if (!form.rol)                    { errForm.rol    = 'Selecciona un rol.';       ok = false }
  if (!form.programa)               { errForm.programa = 'Selecciona un programa.'; ok = false }
  if (!form.idInstitucional.trim()) { errForm.idInstitucional = 'El ID es requerido.'; ok = false }
  return ok
}

async function guardarUsuario() {
  if (!validarForm()) return
  guardando.value = true
  try {
    if (usuarioEditando.value) {
      const actualizado = await usuariosService.editar(usuarioEditando.value.id, {
        nombre: form.nombre, email: form.email,
        rol: form.rol as RolUsuario, programa: form.programa,
        idInstitucional: form.idInstitucional,
      })
      const idx = usuarios.value.findIndex(u => u.id === usuarioEditando.value!.id)
      if (idx !== -1) usuarios.value[idx] = actualizado
      mostrarToast('Usuario actualizado correctamente.', 'exito')
    } else {
      const nuevo = await usuariosService.crear({
        nombre: form.nombre, email: form.email,
        rol: form.rol as RolUsuario, programa: form.programa,
        idInstitucional: form.idInstitucional,
      })
      usuarios.value.unshift(nuevo)
      total.value++
      mostrarToast('Usuario creado correctamente.', 'exito')
    }
    cerrarModal()
  } catch (err: unknown) {
    mostrarToast((err as { message?: string })?.message ?? 'Error al guardar.', 'error')
  } finally {
    guardando.value = false
  }
}

async function confirmarEliminar(u: UsuarioAdmin) {
  if (!confirm(`¿Eliminar a ${u.nombre}? Esta acción no se puede deshacer.`)) return
  try {
    await usuariosService.eliminar(u.id)
    usuarios.value = usuarios.value.filter(x => x.id !== u.id)
    total.value--
    mostrarToast('Usuario eliminado.', 'exito')
  } catch (err: unknown) {
    mostrarToast((err as { message?: string })?.message ?? 'Error al eliminar.', 'error')
  }
}

function exportar() {
  usuariosService.exportar().catch(() => {})
}

function mostrarToast(mensaje: string, tipo: 'exito' | 'error') {
  toast.value = { mensaje, tipo }
  setTimeout(() => { toast.value = null }, 3500)
}

// ─── Computed ────────────────────────────────────────────────────────────────
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / PER_PAGE)))

const rangoLabel = computed(() => {
  if (!total.value) return '0'
  const from = (page.value - 1) * PER_PAGE + 1
  const to   = Math.min(page.value * PER_PAGE, total.value)
  return `${from} - ${to}`
})

const pageButtons = computed(() => {
  const t = totalPages.value
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)
  const c = page.value
  if (c <= 3) return [1, 2, 3, '...', t]
  if (c >= t - 2) return [1, '...', t - 2, t - 1, t]
  return [1, '...', c - 1, c, c + 1, '...', t]
})

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rolChip(rol: RolUsuario): string {
  const map: Record<RolUsuario, string> = {
    'Estudiante':    'bg-blue-50 text-blue-600',
    'Secretaria':    'bg-purple-50 text-purple-600',
    'Docente':       'bg-amber-50 text-amber-600',
    'Administrador': 'bg-slate-100 text-slate-600',
  }
  return map[rol] ?? 'bg-slate-100 text-slate-500'
}

function estadoColor(estado: EstadoUsuario): string {
  const map: Record<EstadoUsuario, string> = {
    'Activo':     'text-slate-700',
    'Inactivo':   'text-slate-400',
    'Suspendido': 'text-red-600',
    'Pendiente':  'text-amber-600',
  }
  return map[estado] ?? 'text-slate-500'
}
</script>
